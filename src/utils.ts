interface GeoLocation {
  lat: number;
  lng: number;
}

export async function getLocationFromIP(
  ip: string | null
): Promise<GeoLocation> {
  // Default location (e.g., New York City) in case IP geolocation fails
  const defaultLocation: GeoLocation = { lat: 40.7128, lng: -74.006 };

  if (!ip) {
    console.warn("No IP address provided");
    return defaultLocation;
  }

  try {
    // Using ipapi.co service for IP geolocation
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();

    if (data.latitude && data.longitude) {
      return { lat: data.latitude, lng: data.longitude };
    } else {
      throw new Error("Invalid location data received");
    }
  } catch (error) {
    console.error("Error getting location from IP:", error);
    return defaultLocation;
  }
}
