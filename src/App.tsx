import { useState, useRef } from "react";
import "./App.css";
import Map from "./components/Map";
import DropDown from "./components/DropDown";
import InfoBox from "./components/InfoBox";
import { Marker } from "maplibre-gl";
import { Location } from "./types";
import { Feature } from "geojson";
function App() {
  console.log("App.tsx");
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedLabel, setSelectedLabel] = useState("");
  const [polygons, setPolygons] = useState<Feature[] | null>(null);
  const markersRef = useRef<Marker[]>([]); // Use ref to store markers

  return (
    <div className="App d-flex">
      <div className="left-column d-flex flex-column">
        <DropDown
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setSelectedLocation={setSelectedLocation}
        />
        <InfoBox
          selectedLocation={selectedLocation}
          selectedLabel={selectedLabel}
          setPolygons={setPolygons}
        />
      </div>
      <div className="right-column">
        <Map
          locations={locations}
          setLocations={setLocations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          markersRef={markersRef}
          polygons={polygons}
          setPolygons={setPolygons}
        />
      </div>
    </div>
  );
}

export default App;
