"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"];

/**
 * Configuration for the google maps widget
 */
const mapOptions: google.maps.MapOptions = {
  mapTypeControl: false, // Removes the map/satellite toggle
  streetViewControl: false, // Removes Street View
  zoomControl: true, // Removes the zoom control
  zoom: 17, // A good default to see a few streets
};

interface LocationMapProps {
  for: string;
  defaultLocation: { lat: number; lng: number };
  apiKey: string;
  latitudeId: string;
  longitudeId: string;
}

export function LocationMap({
  for: inputId,
  defaultLocation,
  apiKey,
  latitudeId,
  longitudeId,
}: LocationMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries as any,
  });

  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultLocation);

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!map) return;

      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results?.[0]) {
            const address = results[0].formatted_address;
            const input = document.getElementById(
              inputId
            ) as HTMLInputElement | null;
            if (input) {
              input.value = address;
            }
          } else {
            console.log("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    },
    [map, inputId]
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setPosition(userLocation);
          // Update hidden inputs
          const latInput = document.getElementById(latitudeId) as HTMLInputElement;
          const lngInput = document.getElementById(longitudeId) as HTMLInputElement;
          if (latInput) latInput.value = userLocation.lat.toString();
          if (lngInput) lngInput.value = userLocation.lng.toString();
          reverseGeocode(userLocation.lat, userLocation.lng);
        },
        () => {
          console.log("Unable to retrieve your location");
          // Use the defaultLocation if geolocation fails
          setCenter(defaultLocation);
          setPosition(defaultLocation);
          // Update hidden inputs
          const latInput = document.getElementById(latitudeId) as HTMLInputElement;
          const lngInput = document.getElementById(longitudeId) as HTMLInputElement;
          if (latInput) latInput.value = defaultLocation.lat.toString();
          if (lngInput) lngInput.value = defaultLocation.lng.toString();
          reverseGeocode(defaultLocation.lat, defaultLocation.lng);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
      // Use the defaultLocation if geolocation is not supported
      setCenter(defaultLocation);
      setPosition(defaultLocation);
      // Update hidden inputs
      const latInput = document.getElementById(latitudeId) as HTMLInputElement;
      const lngInput = document.getElementById(longitudeId) as HTMLInputElement;
      if (latInput) latInput.value = defaultLocation.lat.toString();
      if (lngInput) lngInput.value = defaultLocation.lng.toString();
      reverseGeocode(defaultLocation.lat, defaultLocation.lng);
    }
  }, [defaultLocation, reverseGeocode, latitudeId, longitudeId]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const geocodeLocation = useCallback(
    (address: string) => {
      if (!map || !address) return;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const { lat, lng } = results[0].geometry.location;
          const newPosition = { lat: lat(), lng: lng() };
          setPosition(newPosition);
          const input = document.getElementById(inputId);
          if (input) {
            reverseGeocode(newPosition.lat, newPosition.lng);
          }
          // Update hidden inputs
          const latInput = document.getElementById(latitudeId) as HTMLInputElement;
          const lngInput = document.getElementById(longitudeId) as HTMLInputElement;
          if (latInput) latInput.value = newPosition.lat.toString();
          if (lngInput) lngInput.value = newPosition.lng.toString();
          map.setCenter(newPosition);
          map.setZoom(15);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },
    [map, inputId, latitudeId, longitudeId]
  );

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const newPosition = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
      setPosition(newPosition);
      reverseGeocode(newPosition.lat, newPosition.lng);
      // Update hidden inputs
      const latInput = document.getElementById(latitudeId) as HTMLInputElement;
      const lngInput = document.getElementById(longitudeId) as HTMLInputElement;
      if (latInput) latInput.value = newPosition.lat.toString();
      if (lngInput) lngInput.value = newPosition.lng.toString();
    },
    [reverseGeocode, latitudeId, longitudeId]
  );

  useEffect(() => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    inputRef.current = input;

    const handleBlur = (e: FocusEvent) => {
      geocodeLocation((e.target as HTMLInputElement).value);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        geocodeLocation((e.target as HTMLInputElement).value);
      }
    };

    if (input) {
      input.addEventListener("blur", handleBlur);
      input.addEventListener("keypress", handleKeyPress);

      return () => {
        input.removeEventListener("blur", handleBlur);
        input.removeEventListener("keypress", handleKeyPress);
      };
    }
  }, [inputId, geocodeLocation]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
      options={mapOptions}
    >
      {position && <Marker position={position} />}
    </GoogleMap>
  );
}