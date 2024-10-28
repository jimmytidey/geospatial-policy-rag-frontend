import React from "react";
import { Location } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

// List of labels
const labels = [
  "green_space",
  "CIL",
  "sustainable_development",
  "house_building",
  "economy",
  "town_centers",
  "communities",
  "community_assets",
  "village_hall",
  "transport",
  "cars",
  "bikes",
  "walking",
  "communications",
  "design",
  "green_belt",
  "climate_change",
  "natural_environment",
  "historic_environment",
  "materials",
  "policy",
  "drainage",
  "consultation",
  "education",
  "sports",
  "views",
  "community_facilities",
];

interface DropdownProps {
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

const DropDown: React.FC<DropdownProps> = ({
  selectedLabel,
  setSelectedLabel,
  setSelectedLocation,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(null);
    setSelectedLabel(event.target.value);
  };

  return (
    <div className="top-0 start-0 m-3 p-3 bg-light rounded border">
      <label htmlFor="label-dropdown" className="form-label">
        Filter by topic:
      </label>
      <select
        id="label-dropdown"
        value={selectedLabel}
        onChange={handleSelectChange}
        className="form-select"
      >
        <option value="">-- Select a label --</option>
        {labels.map((label, index) => (
          <option key={index} value={label}>
            {label.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
