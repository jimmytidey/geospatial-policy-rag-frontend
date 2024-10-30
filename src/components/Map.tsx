import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Location } from "../types";
import {
  Map as MapLibreMap,
  NavigationControl,
  Marker,
  Popup,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

interface MapProps {
  locations: Location[] | null;
  setLocations: React.Dispatch<React.SetStateAction<Location[] | null>>;
  selectedLocation: Location | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  markersRef: React.MutableRefObject<Marker[]>;
}

const Map: React.FC<MapProps> = ({
  locations,
  setLocations,
  setSelectedLocation,
  selectedLabel,
  markersRef,
}) => {
  const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isMapInitializedRef = useRef(false); // Flag to prevent double initialization

  useEffect(() => {
    if (!mapContainerRef.current || isMapInitializedRef.current) return;
    isMapInitializedRef.current = true; // Mark map as initialized
    console.log("Map instance initialized");

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      center: [-1.549077, 53.800755],
      zoom: 9,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=pZEHwGwcYFgGP9mOMCRb`,
    });

    const nav = new NavigationControl({ visualizePitch: true });
    map.addControl(nav, "top-left");

    setMapInstance(map);

    return () => {
      map.remove();
      isMapInitializedRef.current = false; // Reset if unmounted
    };
  }, []); // Run once on mount

  useEffect(() => {
    const fetchLocations = async () => {
      console.log("Fetching locations");
      const controller = new AbortController();

      try {
        let url = import.meta.env.VITE_API_PATH + "/get_top_locations";
        if (selectedLabel) {
          url += `?labels=${encodeURIComponent(selectedLabel)}`;
        }

        const response = await fetch(url, { signal: controller.signal });
        const data: Location[] = await response.json();
        console.log("Locations fetched:", data);
        setLocations(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Failed to fetch locations:", error);
        }
      }

      return () => {
        controller.abort(); // Abort fetch on cleanup
      };
    };

    fetchLocations();
  }, [selectedLabel, setLocations]);

  useEffect(() => {
    if (!mapInstance || !locations) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.remove(); // Clear markers from map
    });
    markersRef.current = [];

    // Add new markers with single click listener
    locations.forEach((location, index) => {
      if (
        typeof location.lat !== "number" ||
        typeof location.lng !== "number"
      ) {
        console.error(`Invalid coordinates at index ${index}`, location);
        return;
      }

      const marker = new Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(new Popup().setText(location.location_names.join(", ")))
        .addTo(mapInstance);

      // Define click handler outside addEventListener to ensure only one is added
      const handleClick = () => {
        console.log("Marker clicked", location);
        setSelectedLocation(location);
      };

      console.log("adding click event listener");
      marker.getElement().addEventListener("click", handleClick);

      // Store marker in ref
      markersRef.current.push(marker);

      // Cleanup listener when marker is removed
      return () => {
        marker.getElement().removeEventListener("click", handleClick);
      };
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [locations, mapInstance, setSelectedLocation]);

  return <MapWrapper ref={mapContainerRef} id="main-map" />;
};

export default Map;
