import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Location, Summary } from "../types";

interface InfoBoxProps {
  selectedLocation: Location | null;
  selectedLabel: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  selectedLocation,
  selectedLabel,
}) => {
  const [summary, setSummary] = useState<Summary>({
    summary: "Click on a location to view the summary",
    prompt: "",
  });
  const [selectedTab, setSelectedTab] = useState<"summary" | "prompt">(
    "summary"
  );

  const fetchSummary = async (location: Location, selectedLabel: string) => {
    setSummary({ summary: "Loading...", prompt: "Loading..." });

    try {
      const response = await fetch(
        import.meta.env.VITE_API_PATH + "/get_location_summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: location.lat,
            lng: location.lng,
            location_names: location.location_names,
            ...(selectedLabel ? { label: selectedLabel } : {}),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary({ summary: "Error", prompt: "Error" });
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchSummary(selectedLocation, selectedLabel);
    } else {
      setSummary({
        summary: "Click on a location to view the summary",
        prompt: "",
      });
    }
  }, [selectedLocation, selectedLabel]);

  return (
    <div
      className="card start-0 m-3 p-3 "
      style={{ height: "100%", overflow: "hidden" }}
    >
      <div className="card-header">
        {/* Bootstrap Nav Tabs */}
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedTab === "summary" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("summary")}
              href="#"
            >
              Summary
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${selectedTab === "prompt" ? "active" : ""}`}
              onClick={() => setSelectedTab("prompt")}
              href="#"
            >
              Prompt
            </a>
          </li>
        </ul>
      </div>

      {/* Content of Tabs */}
      <div className="card-body overflow-auto">
        {selectedTab === "summary" && (
          <div>
            <h3>Summary</h3>
            <p className="show-whitespace">{summary.summary}</p>
          </div>
        )}
        {selectedTab === "prompt" && (
          <div>
            <h4>Prompt</h4>
            <p>{summary.prompt}</p>
            {summary.text_chunks &&
              summary.text_chunks.map((chunk, index) => (
                <div key={index}>
                  <strong>
                    <p>{chunk.title}</p>
                    <em>Distance: {chunk.distance_from_location}</em>
                  </strong>
                  <p></p>
                  <em>
                    <p>{chunk.sections}</p>
                  </em>
                  <p className="show-whitespace">{chunk.text}</p>
                  <p>{chunk.labels.join(", ")}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBox;
