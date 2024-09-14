import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface LocationMapProps {
  for: string;
  defaultLocation: { lat: number; lng: number };
}

export default function LocationMap({
  for: inputId,
  defaultLocation,
}: LocationMapProps) {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(defaultLocation);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.PUBLIC_MAPS_API_KEY,
  });

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
          reverseGeocode(userLocation.lat, userLocation.lng);
        },
        () => {
          console.log("Unable to retrieve your location");
          // Use the defaultLocation if geolocation fails
          setCenter(defaultLocation);
          setPosition(defaultLocation);
          reverseGeocode(defaultLocation.lat, defaultLocation.lng);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
      // Use the defaultLocation if geolocation is not supported
      setCenter(defaultLocation);
      setPosition(defaultLocation);
      reverseGeocode(defaultLocation.lat, defaultLocation.lng);
    }
  }, [defaultLocation]);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("onLoad", map);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    console.log("onUnmount", map);
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
          map.setCenter(newPosition);
          map.setZoom(15);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },
    [map, inputId]
  );

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

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const newPosition = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
      setPosition(newPosition);
      reverseGeocode(newPosition.lat, newPosition.lng);
    },
    [reverseGeocode]
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {position && <Marker position={position} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}
