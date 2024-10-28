// Interface for a single location entry
export interface Location {
  lat: number; // Represents the latitude of the location
  lng: number; // Represents the longitude of the location
  location_names: string[]; // Array of location names associated with the location
  text_fragment_count: number; // Number of distinct text fragments
  text_fragments?: TextFragment[]; // Array of text fragments with title, sections, and text
  located_chunk_id?: string[]; // Array of chunk IDs associated with the location
}

// Interface for a single text fragment object
export interface TextFragment {
  lat?: number;
  lng?: number;
  chunk_id?: string;
  location_name?: string;
  title: string;
  sections: string;
  text: string; // New field to represent the text content
  labels: string[]; // New field to represent the labels
}

// The summary that comes back from the summarization API
export interface Summary {
  summary: string;
  prompt: string; // Optional properties can be marked with "?"
  text_chunks?: TextFragment[];
}
