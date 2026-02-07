export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  totalSpaces: number;
  availableSpaces: number;
  pricePerHour: number;
  type: "multi-level" | "open" | "underground" | "street";
  rating: number;
  features: string[];
  openHours: string;
  isOpen24Hours: boolean;
}

export interface SearchLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  type: "landmark" | "mall" | "hospital" | "station" | "airport" | "temple" | "university" | "market";
}

// Real parking locations across Gujarat
export const parkingSpots: ParkingSpot[] = [
  // Ahmedabad
  {
    id: "p1",
    name: "Riverfront Multi-Level Parking",
    address: "Sabarmati Riverfront, Near Ellis Bridge",
    city: "Ahmedabad",
    lat: 23.0350,
    lng: 72.5714,
    totalSpaces: 450,
    availableSpaces: 127,
    pricePerHour: 30,
    type: "multi-level",
    rating: 4.5,
    features: ["CCTV", "EV Charging", "Covered", "Valet"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  {
    id: "p2",
    name: "CG Road Parking Complex",
    address: "CG Road, Near Municipal Market",
    city: "Ahmedabad",
    lat: 23.0258,
    lng: 72.5600,
    totalSpaces: 300,
    availableSpaces: 85,
    pricePerHour: 25,
    type: "underground",
    rating: 4.2,
    features: ["CCTV", "Covered", "Wheelchair Access"],
    openHours: "6:00 AM - 11:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p3",
    name: "Alpha One Mall Parking",
    address: "Alpha One Mall, Vastrapur",
    city: "Ahmedabad",
    lat: 23.0305,
    lng: 72.5179,
    totalSpaces: 600,
    availableSpaces: 234,
    pricePerHour: 40,
    type: "multi-level",
    rating: 4.7,
    features: ["CCTV", "EV Charging", "Covered", "Valet", "Car Wash"],
    openHours: "10:00 AM - 11:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p4",
    name: "Manek Chowk Parking",
    address: "Manek Chowk, Old City",
    city: "Ahmedabad",
    lat: 23.0263,
    lng: 72.5851,
    totalSpaces: 150,
    availableSpaces: 32,
    pricePerHour: 15,
    type: "open",
    rating: 3.5,
    features: ["CCTV", "Security Guard"],
    openHours: "8:00 AM - 12:00 AM",
    isOpen24Hours: false,
  },
  {
    id: "p5",
    name: "SG Highway Parking Zone",
    address: "SG Highway, Near Pakwan Cross Roads",
    city: "Ahmedabad",
    lat: 23.0434,
    lng: 72.5080,
    totalSpaces: 350,
    availableSpaces: 180,
    pricePerHour: 20,
    type: "open",
    rating: 3.8,
    features: ["CCTV", "Wide Spaces", "Bike Parking"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  {
    id: "p6",
    name: "Palladium Mall Parking",
    address: "Palladium Ahmedabad, South Bopal",
    city: "Ahmedabad",
    lat: 23.0150,
    lng: 72.4700,
    totalSpaces: 500,
    availableSpaces: 290,
    pricePerHour: 35,
    type: "multi-level",
    rating: 4.6,
    features: ["CCTV", "EV Charging", "Covered", "Valet"],
    openHours: "10:00 AM - 10:30 PM",
    isOpen24Hours: false,
  },
  // Surat
  {
    id: "p7",
    name: "VR Surat Mall Parking",
    address: "VR Surat, Dumas Road",
    city: "Surat",
    lat: 21.1568,
    lng: 72.7734,
    totalSpaces: 400,
    availableSpaces: 156,
    pricePerHour: 30,
    type: "multi-level",
    rating: 4.4,
    features: ["CCTV", "EV Charging", "Covered", "Valet"],
    openHours: "10:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p8",
    name: "Athwa Gate Parking",
    address: "Athwa Gate, Ring Road",
    city: "Surat",
    lat: 21.1836,
    lng: 72.8105,
    totalSpaces: 200,
    availableSpaces: 67,
    pricePerHour: 20,
    type: "open",
    rating: 3.9,
    features: ["CCTV", "Security Guard", "Bike Parking"],
    openHours: "7:00 AM - 11:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p9",
    name: "Surat Railway Station Parking",
    address: "Near Surat Railway Station",
    city: "Surat",
    lat: 21.2050,
    lng: 72.8403,
    totalSpaces: 250,
    availableSpaces: 48,
    pricePerHour: 15,
    type: "open",
    rating: 3.3,
    features: ["CCTV", "Security Guard"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  // Vadodara
  {
    id: "p10",
    name: "Inorbit Mall Parking",
    address: "Inorbit Mall, Gorwa Road",
    city: "Vadodara",
    lat: 22.3253,
    lng: 73.1670,
    totalSpaces: 350,
    availableSpaces: 201,
    pricePerHour: 25,
    type: "multi-level",
    rating: 4.3,
    features: ["CCTV", "EV Charging", "Covered", "Valet"],
    openHours: "10:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p11",
    name: "Alkapuri Parking Zone",
    address: "Alkapuri, RC Dutt Road",
    city: "Vadodara",
    lat: 22.3100,
    lng: 73.1720,
    totalSpaces: 180,
    availableSpaces: 95,
    pricePerHour: 20,
    type: "street",
    rating: 3.7,
    features: ["CCTV", "Bike Parking"],
    openHours: "8:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p12",
    name: "Vadodara Junction Parking",
    address: "Near Vadodara Railway Station",
    city: "Vadodara",
    lat: 22.3106,
    lng: 73.1812,
    totalSpaces: 200,
    availableSpaces: 52,
    pricePerHour: 15,
    type: "open",
    rating: 3.4,
    features: ["CCTV", "Security Guard"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  // Rajkot
  {
    id: "p13",
    name: "Crystal Mall Parking",
    address: "Crystal Mall, Kalawad Road",
    city: "Rajkot",
    lat: 22.2863,
    lng: 70.7765,
    totalSpaces: 300,
    availableSpaces: 167,
    pricePerHour: 20,
    type: "multi-level",
    rating: 4.1,
    features: ["CCTV", "Covered", "Wheelchair Access"],
    openHours: "10:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  {
    id: "p14",
    name: "Race Course Parking",
    address: "Race Course Road, Rajkot",
    city: "Rajkot",
    lat: 22.2950,
    lng: 70.7964,
    totalSpaces: 250,
    availableSpaces: 140,
    pricePerHour: 15,
    type: "open",
    rating: 3.6,
    features: ["CCTV", "Wide Spaces", "Bike Parking"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  // Gandhinagar
  {
    id: "p15",
    name: "Infocity Parking Complex",
    address: "Infocity, GIFT City Road",
    city: "Gandhinagar",
    lat: 23.2156,
    lng: 72.6369,
    totalSpaces: 500,
    availableSpaces: 340,
    pricePerHour: 20,
    type: "multi-level",
    rating: 4.5,
    features: ["CCTV", "EV Charging", "Covered", "Bike Parking"],
    openHours: "24/7",
    isOpen24Hours: true,
  },
  {
    id: "p16",
    name: "Mahatma Mandir Parking",
    address: "Near Mahatma Mandir Convention Centre",
    city: "Gandhinagar",
    lat: 23.2146,
    lng: 72.6560,
    totalSpaces: 400,
    availableSpaces: 280,
    pricePerHour: 15,
    type: "open",
    rating: 4.0,
    features: ["CCTV", "Wide Spaces", "Security Guard"],
    openHours: "6:00 AM - 11:00 PM",
    isOpen24Hours: false,
  },
  // Bhavnagar
  {
    id: "p17",
    name: "Nilambag Circle Parking",
    address: "Nilambag Circle, Station Road",
    city: "Bhavnagar",
    lat: 21.7645,
    lng: 72.1519,
    totalSpaces: 120,
    availableSpaces: 78,
    pricePerHour: 10,
    type: "open",
    rating: 3.5,
    features: ["CCTV", "Security Guard"],
    openHours: "7:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  // Junagadh
  {
    id: "p18",
    name: "Girnar Ropeway Parking",
    address: "Near Girnar Ropeway Station",
    city: "Junagadh",
    lat: 21.5222,
    lng: 70.4579,
    totalSpaces: 200,
    availableSpaces: 120,
    pricePerHour: 15,
    type: "open",
    rating: 3.8,
    features: ["CCTV", "Wide Spaces"],
    openHours: "6:00 AM - 6:00 PM",
    isOpen24Hours: false,
  },
  // Dwarka
  {
    id: "p19",
    name: "Dwarkadhish Temple Parking",
    address: "Near Dwarkadhish Temple",
    city: "Dwarka",
    lat: 22.2376,
    lng: 68.9674,
    totalSpaces: 300,
    availableSpaces: 95,
    pricePerHour: 20,
    type: "open",
    rating: 3.9,
    features: ["CCTV", "Security Guard", "Wide Spaces"],
    openHours: "5:00 AM - 10:00 PM",
    isOpen24Hours: false,
  },
  // Somnath
  {
    id: "p20",
    name: "Somnath Temple Parking",
    address: "Near Somnath Temple",
    city: "Somnath",
    lat: 20.8880,
    lng: 70.4012,
    totalSpaces: 350,
    availableSpaces: 165,
    pricePerHour: 15,
    type: "open",
    rating: 4.0,
    features: ["CCTV", "Security Guard", "Bike Parking"],
    openHours: "5:00 AM - 9:00 PM",
    isOpen24Hours: false,
  },
];

// Real searchable locations in Gujarat
export const searchLocations: SearchLocation[] = [
  // Ahmedabad Landmarks
  { id: "l1", name: "Sabarmati Ashram", address: "Ashram Road, Ahmedabad", city: "Ahmedabad", lat: 23.0607, lng: 72.5800, type: "landmark" },
  { id: "l2", name: "Kankaria Lake", address: "Maninagar, Ahmedabad", city: "Ahmedabad", lat: 22.9967, lng: 72.6010, type: "landmark" },
  { id: "l3", name: "Science City", address: "Sola, Ahmedabad", city: "Ahmedabad", lat: 23.0731, lng: 72.5108, type: "landmark" },
  { id: "l4", name: "Alpha One Mall", address: "Vastrapur, Ahmedabad", city: "Ahmedabad", lat: 23.0305, lng: 72.5179, type: "mall" },
  { id: "l5", name: "Palladium Ahmedabad", address: "South Bopal, Ahmedabad", city: "Ahmedabad", lat: 23.0150, lng: 72.4700, type: "mall" },
  { id: "l6", name: "Civil Hospital Ahmedabad", address: "Asarwa, Ahmedabad", city: "Ahmedabad", lat: 23.0504, lng: 72.6050, type: "hospital" },
  { id: "l7", name: "Ahmedabad Railway Station", address: "Kalupur, Ahmedabad", city: "Ahmedabad", lat: 23.0225, lng: 72.6006, type: "station" },
  { id: "l8", name: "Sardar Vallabhbhai Patel Intl Airport", address: "Hansol, Ahmedabad", city: "Ahmedabad", lat: 23.0734, lng: 72.6266, type: "airport" },
  { id: "l9", name: "ISKCON Temple Ahmedabad", address: "SG Highway, Ahmedabad", city: "Ahmedabad", lat: 23.0276, lng: 72.5075, type: "temple" },
  { id: "l10", name: "IIM Ahmedabad", address: "Vastrapur, Ahmedabad", city: "Ahmedabad", lat: 23.0329, lng: 72.5268, type: "university" },
  { id: "l11", name: "Law Garden Market", address: "Ellisbridge, Ahmedabad", city: "Ahmedabad", lat: 23.0283, lng: 72.5616, type: "market" },
  { id: "l12", name: "Manek Chowk", address: "Old City, Ahmedabad", city: "Ahmedabad", lat: 23.0263, lng: 72.5851, type: "market" },
  // Surat
  { id: "l13", name: "Dumas Beach", address: "Dumas, Surat", city: "Surat", lat: 21.0870, lng: 72.7140, type: "landmark" },
  { id: "l14", name: "VR Surat Mall", address: "Dumas Road, Surat", city: "Surat", lat: 21.1568, lng: 72.7734, type: "mall" },
  { id: "l15", name: "Surat Railway Station", address: "Surat", city: "Surat", lat: 21.2050, lng: 72.8403, type: "station" },
  { id: "l16", name: "New Civil Hospital Surat", address: "Majura Gate, Surat", city: "Surat", lat: 21.1938, lng: 72.8175, type: "hospital" },
  { id: "l17", name: "Dutch Garden Surat", address: "Nanpura, Surat", city: "Surat", lat: 21.1843, lng: 72.8232, type: "landmark" },
  // Vadodara
  { id: "l18", name: "Laxmi Vilas Palace", address: "JN Marg, Vadodara", city: "Vadodara", lat: 22.2930, lng: 73.1910, type: "landmark" },
  { id: "l19", name: "Inorbit Mall Vadodara", address: "Gorwa, Vadodara", city: "Vadodara", lat: 22.3253, lng: 73.1670, type: "mall" },
  { id: "l20", name: "Vadodara Railway Station", address: "Vadodara", city: "Vadodara", lat: 22.3106, lng: 73.1812, type: "station" },
  { id: "l21", name: "Sayaji Garden", address: "Karelibaug, Vadodara", city: "Vadodara", lat: 22.3150, lng: 73.1923, type: "landmark" },
  { id: "l22", name: "MS University Vadodara", address: "Pratapgunj, Vadodara", city: "Vadodara", lat: 22.3040, lng: 73.1890, type: "university" },
  // Rajkot
  { id: "l23", name: "Watson Museum", address: "Jubilee Garden, Rajkot", city: "Rajkot", lat: 22.3039, lng: 70.8022, type: "landmark" },
  { id: "l24", name: "Crystal Mall Rajkot", address: "Kalawad Road, Rajkot", city: "Rajkot", lat: 22.2863, lng: 70.7765, type: "mall" },
  { id: "l25", name: "Race Course Rajkot", address: "Race Course Rd, Rajkot", city: "Rajkot", lat: 22.2950, lng: 70.7964, type: "landmark" },
  // Gandhinagar
  { id: "l26", name: "Akshardham Temple", address: "Sector 20, Gandhinagar", city: "Gandhinagar", lat: 23.2051, lng: 72.6563, type: "temple" },
  { id: "l27", name: "GIFT City", address: "GIFT City, Gandhinagar", city: "Gandhinagar", lat: 23.2156, lng: 72.6369, type: "landmark" },
  { id: "l28", name: "Mahatma Mandir", address: "Sector 13, Gandhinagar", city: "Gandhinagar", lat: 23.2146, lng: 72.6560, type: "landmark" },
  // Other Cities
  { id: "l29", name: "Statue of Unity", address: "Kevadia, Narmada", city: "Kevadia", lat: 21.8380, lng: 73.7191, type: "landmark" },
  { id: "l30", name: "Dwarkadhish Temple", address: "Dwarka", city: "Dwarka", lat: 22.2376, lng: 68.9674, type: "temple" },
  { id: "l31", name: "Somnath Temple", address: "Somnath, Gir Somnath", city: "Somnath", lat: 20.8880, lng: 70.4012, type: "temple" },
  { id: "l32", name: "Girnar Ropeway", address: "Junagadh", city: "Junagadh", lat: 21.5222, lng: 70.4579, type: "landmark" },
  { id: "l33", name: "Rann of Kutch", address: "Kutch", city: "Kutch", lat: 23.7337, lng: 69.8597, type: "landmark" },
  { id: "l34", name: "Gir National Park", address: "Sasan Gir, Junagadh", city: "Junagadh", lat: 21.1243, lng: 70.7933, type: "landmark" },
];

// Utility: Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Utility: Estimate travel time based on distance and traffic
export function estimateTravelTime(
  distanceKm: number,
  trafficLevel: "low" | "moderate" | "heavy"
): number {
  const speedMap = { low: 40, moderate: 25, heavy: 15 }; // km/h in city
  const speed = speedMap[trafficLevel];
  return Math.round((distanceKm / speed) * 60); // minutes
}

// Utility: Get traffic level based on time of day
export function getTrafficLevel(): "low" | "moderate" | "heavy" {
  const hour = new Date().getHours();
  if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) return "heavy";
  if ((hour >= 11 && hour <= 16) || (hour >= 6 && hour <= 7)) return "moderate";
  return "low";
}

// Utility: Get nearest parking spots to a location
export function getNearestParkingSpots(
  lat: number,
  lng: number,
  limit: number = 5
): (ParkingSpot & { distance: number })[] {
  return parkingSpots
    .map((spot) => ({
      ...spot,
      distance: calculateDistance(lat, lng, spot.lat, spot.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// Search locations by query
export function searchPlaces(query: string): SearchLocation[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return searchLocations
    .filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.type.toLowerCase().includes(q)
    )
    .slice(0, 4);
}
