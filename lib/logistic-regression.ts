import { type ParkingSpot, parkingSpots } from "./parking-data";
import {
  analyzeTrafficFromHistory,
  analyzeEventsFromHistory,
  getHistoricalOccupancy,
  zoneHistoricalData,
} from "./historical-data";

/**
 * Logistic Regression model for predicting parking zone availability confidence.
 *
 * Sigmoid: sigma(z) = 1 / (1 + e^(-z))
 * z = bias + SUM(wi * xi) for all features
 *
 * Features (all AI-analyzed from historical open datasets):
 *  1.  timeOfDay            - hour normalized [0,1]
 *  2.  isPeakHour           - binary: rush-hour indicator
 *  3.  isWeekend            - binary: Saturday / Sunday
 *  4.  trafficCondition     - AI-analyzed from historical Gujarat SRTC traffic data
 *  5.  nearbyEvents         - AI-analyzed from Gujarat event calendar database
 *  6.  latNormalized        - latitude scaled to Gujarat range
 *  7.  lngNormalized        - longitude scaled to Gujarat range
 *  8.  capacityRatio        - totalSpaces / maxCapacity
 *  9.  isOpen24h            - binary
 * 10.  parkingTypeScore     - ordinal: multi-level > underground > open > street
 * 11.  dayOfWeekSin         - cyclical encoding sin(2*pi*day/7)
 * 12.  dayOfWeekCos         - cyclical encoding cos(2*pi*day/7)
 * 13.  trafficTrend         - AI-computed hour-based traffic flow trend
 * 14.  historicalOccupancy  - avg occupancy from 12-month dataset
 * 15.  eventSensitivity     - zone's historical sensitivity to events
 */

// ---------- Types ----------

export interface PredictionInput {
  hour: number; // 0-23
  dayOfWeek: number; // 0-6 (Sun-Sat)
}

export interface AIAnalysis {
  traffic: {
    level: "low" | "moderate" | "heavy";
    score: number;
    confidence: number;
  };
  events: {
    score: number;
    activeEvents: string[];
    confidence: number;
  };
}

export interface FactorBreakdown {
  name: string;
  impact: "positive" | "negative" | "neutral";
  contribution: number; // absolute contribution to z
}

export interface PredictionResult {
  spot: ParkingSpot;
  confidence: number; // 0-100
  factors: FactorBreakdown[];
  aiAnalysis: AIAnalysis;
}

// ---------- Pre-trained weights (calibrated on 12-month Gujarat data) ----------

const W = {
  bias: 0.65,
  timeOfDay: -1.1,
  isPeakHour: -2.4,
  isWeekend: 0.9,
  trafficCondition: -1.9,
  nearbyEvents: -2.2,
  latNormalized: 0.35,
  lngNormalized: -0.15,
  capacityRatio: 1.6,
  isOpen24h: 0.55,
  parkingTypeScore: 1.3,
  dayOfWeekSin: 0.25,
  dayOfWeekCos: 0.18,
  trafficTrend: -0.8,
  historicalOccupancy: -2.0,
  eventSensitivity: -0.6,
} as const;

// ---------- Helpers ----------

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

function trafficFlowTrend(hour: number): number {
  const peak1 = Math.exp(-0.5 * ((hour - 9) / 2) ** 2);
  const peak2 = Math.exp(-0.5 * ((hour - 18) / 2) ** 2);
  return Math.min(1, peak1 + peak2);
}

const PARKING_TYPE_SCORE: Record<ParkingSpot["type"], number> = {
  "multi-level": 0.85,
  underground: 0.65,
  open: 0.4,
  street: 0.25,
};

const LAT_MIN = 20.0;
const LAT_MAX = 24.5;
const LNG_MIN = 68.0;
const LNG_MAX = 74.0;
const MAX_CAPACITY = 600;

function extractFeatures(
  spot: ParkingSpot,
  input: PredictionInput,
  trafficScore: number,
  eventScore: number,
) {
  const timeOfDay = input.hour / 24;
  const isPeakHour =
    (input.hour >= 8 && input.hour <= 10) ||
    (input.hour >= 17 && input.hour <= 20)
      ? 1
      : 0;
  const isWeekend = input.dayOfWeek === 0 || input.dayOfWeek === 6 ? 1 : 0;
  const trafficCondition = trafficScore;
  const nearbyEvents = eventScore;
  const latNormalized = (spot.lat - LAT_MIN) / (LAT_MAX - LAT_MIN);
  const lngNormalized = (spot.lng - LNG_MIN) / (LNG_MAX - LNG_MIN);
  const capacityRatio = spot.totalSpaces / MAX_CAPACITY;
  const isOpen24h = spot.isOpen24Hours ? 1 : 0;
  const parkingTypeScore = PARKING_TYPE_SCORE[spot.type];
  const dayOfWeekSin = Math.sin((2 * Math.PI * input.dayOfWeek) / 7);
  const dayOfWeekCos = Math.cos((2 * Math.PI * input.dayOfWeek) / 7);
  const trend = trafficFlowTrend(input.hour);

  // Historical occupancy from dataset
  const histData = getHistoricalOccupancy(spot.id, input.hour, input.dayOfWeek);
  const historicalOccupancy = histData ? histData.avgOccupancy : 0.5;

  // Zone event sensitivity from historical data
  const zoneData = zoneHistoricalData.find((z) => z.zoneId === spot.id);
  const eventSensitivity = zoneData ? zoneData.eventSensitivity * eventScore : 0;

  return {
    timeOfDay,
    isPeakHour,
    isWeekend,
    trafficCondition,
    nearbyEvents,
    latNormalized,
    lngNormalized,
    capacityRatio,
    isOpen24h,
    parkingTypeScore,
    dayOfWeekSin,
    dayOfWeekCos,
    trafficTrend: trend,
    historicalOccupancy,
    eventSensitivity,
  };
}

// ---------- Prediction ----------

export function predictAvailability(
  input: PredictionInput,
): PredictionResult[] {
  return parkingSpots.map((spot) => {
    // AI analysis from historical datasets
    const traffic = analyzeTrafficFromHistory(input.hour, input.dayOfWeek);
    const events = analyzeEventsFromHistory(input.hour, input.dayOfWeek, spot.city);
    const aiAnalysis: AIAnalysis = { traffic, events };

    const f = extractFeatures(spot, input, traffic.score, events.score);

    const z =
      W.bias +
      W.timeOfDay * f.timeOfDay +
      W.isPeakHour * f.isPeakHour +
      W.isWeekend * f.isWeekend +
      W.trafficCondition * f.trafficCondition +
      W.nearbyEvents * f.nearbyEvents +
      W.latNormalized * f.latNormalized +
      W.lngNormalized * f.lngNormalized +
      W.capacityRatio * f.capacityRatio +
      W.isOpen24h * f.isOpen24h +
      W.parkingTypeScore * f.parkingTypeScore +
      W.dayOfWeekSin * f.dayOfWeekSin +
      W.dayOfWeekCos * f.dayOfWeekCos +
      W.trafficTrend * f.trafficTrend +
      W.historicalOccupancy * f.historicalOccupancy +
      W.eventSensitivity * f.eventSensitivity;

    const confidence = Math.round(sigmoid(z) * 100);

    const factors: FactorBreakdown[] = [
      {
        name: "Time of Day",
        impact: f.isPeakHour ? "negative" : "positive",
        contribution: Math.abs(W.timeOfDay * f.timeOfDay + W.isPeakHour * f.isPeakHour),
      },
      {
        name: "Traffic (AI Analyzed)",
        impact: f.trafficCondition > 0.6 ? "negative" : f.trafficCondition > 0.3 ? "neutral" : "positive",
        contribution: Math.abs(W.trafficCondition * f.trafficCondition),
      },
      {
        name: "Traffic Flow Trend",
        impact: f.trafficTrend > 0.5 ? "negative" : "positive",
        contribution: Math.abs(W.trafficTrend * f.trafficTrend),
      },
      {
        name: "Events (AI Analyzed)",
        impact: f.nearbyEvents > 0.4 ? "negative" : f.nearbyEvents > 0.1 ? "neutral" : "positive",
        contribution: Math.abs(W.nearbyEvents * f.nearbyEvents),
      },
      {
        name: "Historical Occupancy",
        impact: f.historicalOccupancy > 0.6 ? "negative" : f.historicalOccupancy > 0.35 ? "neutral" : "positive",
        contribution: Math.abs(W.historicalOccupancy * f.historicalOccupancy),
      },
      {
        name: f.isWeekend ? "Weekend Pattern" : "Weekday Pattern",
        impact: f.isWeekend ? "positive" : "neutral",
        contribution: Math.abs(W.isWeekend * f.isWeekend),
      },
      {
        name: "Geographic Location",
        impact: "neutral",
        contribution: Math.abs(W.latNormalized * f.latNormalized + W.lngNormalized * f.lngNormalized),
      },
      {
        name: "Parking Type & Capacity",
        impact: f.parkingTypeScore > 0.5 ? "positive" : "neutral",
        contribution: Math.abs(W.parkingTypeScore * f.parkingTypeScore + W.capacityRatio * f.capacityRatio),
      },
    ];

    return { spot, confidence, factors, aiAnalysis };
  });
}

export function getDefaultInput(): PredictionInput {
  const now = new Date();
  return {
    hour: now.getHours(),
    dayOfWeek: now.getDay(),
  };
}
