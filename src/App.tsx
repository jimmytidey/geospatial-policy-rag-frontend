import { useState, useRef } from "react";
import "./App.css";
import Map from "./components/Map";
import DropDown from "./components/DropDown";
import InfoBox from "./components/InfoBox";
import { Marker } from "maplibre-gl";
import { Location } from "./types"; // Adjust the path based on your project structure

function App() {
  console.log("App.tsx");
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedLabel, setSelectedLabel] = useState("");
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
        />
      </div>
    </div>
  );
}

export default App;
