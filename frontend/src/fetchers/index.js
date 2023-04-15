import generateLineChart from "../utils/GenerateLineCharts";
import {CityData} from "../components/Dashboards/CityData";

async function fetchCityData(city) {
  try {
    const capitalizedStr = city.charAt(0).toUpperCase() + city.slice(1);
    const response = await fetch(`/cities/${capitalizedStr}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default fetchCityData;