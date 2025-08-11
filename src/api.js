import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/heatmapData");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
