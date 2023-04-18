import React, { useEffect, useState } from "react";
import LineChart from "./LineChart/LineChart";
import {
  generateLineChart,
  generateBarChart,
  generateDonutChart,
} from "../../utils/Charts/GenerateCharts";
import "chart.js/auto";
import LineChartMenu from "./LineChart/LineChartMenu";
import { useParams } from "react-router";
import Loading from "../../utils/Animations/Loading";
import BarChart from "./BarChart/BarChart";
import DonutChart from "./DonutChart/DonutChart";
import "./CityBoard.css";

const CityBoard = () => {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState({});
  const [lineChartLocation, setLineChartLocation] = useState("");
  const [barChartLocation, setBarChartLocation] = useState("");
  const [donutChartLocation, setDonutChartLocation] = useState("");
  const [locationsNames, setLocationsNames] = useState([]);
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [donutChartData, setDonutChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [lineTimeRange, setLineTimeRange] = useState("none");
  const [donutTimeRange, setDonutTimeRange] = useState("none");
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barTimeRange, setBarTimeRange] = useState("none");
  let [flag, setFlag] = useState(0);
  const [isLoadingLineChart, setIsLoadingLineChart] = useState(true);
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true);
  const [isLoadingDonutChart, setIsLoadingDonutChart] = useState(true);



  // fetch city data
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const capitalizedStr =
          cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const response = await fetch(
          `http://localhost:3001/cities/${capitalizedStr}`
        );
        const cityData = await response.json();
        setCityData(cityData);
      } catch (error) {
        console.error(error);
        if (error.message === 'No data found in the database') {
          alert('No data found in the database');
        }
      }
    };
    fetchCityData().then((r) => console.log("City data fetched successfully"));
    // fetch city data every 6 seconds
    const interval = setInterval(() => {
      fetchCityData().then((r) =>
        console.log("City data fetched successfully")
      );
    }, 6000);

    // clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [cityName])


  useEffect(() => {
    // set locations info
    if (flag === 0 && Object.keys(cityData).length > 0) {
      const locationNames = Object.keys(cityData);
      setLocationsNames(locationNames);

      if (locationNames.length > 0) {
        setLineChartLocation(locationNames[0]);
        setBarChartLocation(locationNames[0]);
        setDonutChartLocation(locationNames[0]);
      }
        setFlag(1);
    }
  }, [cityData, flag]);

  useEffect(() => {
    if (
      lineChartLocation &&
      lineTimeRange &&
      Object.keys(cityData).length > 0
    ) {
      setIsLoadingLineChart(true);
      const lineChartData = generateLineChart(
        cityData,
        lineChartLocation,
        lineTimeRange
      );
      setLineChartData(lineChartData);
      setIsLoadingLineChart(false);
    }
  }, [lineChartLocation, lineTimeRange, cityData]);

  // generate bar chart data
  useEffect(() => {
    if (barChartLocation &&
        barTimeRange &&
        Object.keys(cityData).length > 0)
    {
      setIsLoadingBarChart(true);
      const barChartData = generateBarChart(
        cityData,
        barChartLocation,
        barTimeRange
      );
      setBarChartData(barChartData);
      setIsLoadingBarChart(false);
    }
  }, [barChartLocation, barTimeRange, cityData]);

  // generate donut chart data
  useEffect(() => {
    if (
      donutChartLocation &&
      donutTimeRange &&
      Object.keys(cityData).length > 0
    ) {
      setIsLoadingDonutChart(true);
      const donutChartData = generateDonutChart(
        cityData,
        donutChartLocation,
        donutTimeRange
      );
      setDonutChartData(donutChartData);
      setIsLoadingDonutChart(false);
    }
  }, [donutChartLocation, donutTimeRange, cityData]);

  // handlers
  const handleLineLocationChange = (event) => {
    setLineChartLocation(event.target.value);
  };

  const handleLineTimeRangeChange = (event) => {
    setLineTimeRange(event.target.value);
  };

  const handleDonutLocationChange = (event) => {
    setDonutChartLocation(event.target.value);
  };

  const handleDonutTimeRangeChange = (event) => {
    setDonutTimeRange(event.target.value);
  };

  const handleBarLocationChange = (event) => {
    setBarChartLocation(event.target.value);
  };

  const handleBarTimeRangeChange = (event) => {
    setBarTimeRange(event.target.value);
  };

  if (Object.keys(cityData).length === 0) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="chart-wrapper">
        <div className="chart-box">
        <div className="chart-title">Pollutant Levels (ug/m3) over Time</div>
          <LineChartMenu
            locations={locationsNames}
            selectedLocation={lineChartLocation}
            onLocationChange={handleLineLocationChange}
            onTimeRangeChange={handleLineTimeRangeChange}
          />
          {isLoadingLineChart ? (<Loading />) : (
              cityData && <LineChart chartData={lineChartData} />
          )}
        </div>
        </div>
      <div className="chart-wrapper">
        <div className="chart-box">
        <div className="chart-title">Average Pollutants Levels</div>
          <LineChartMenu
            locations={locationsNames}
            selectedLocation={barChartLocation}
            onLocationChange={handleBarLocationChange}
            onTimeRangeChange={handleBarTimeRangeChange}
          />
          {isLoadingBarChart ? (<Loading />) : (
            cityData && <BarChart chartData={barChartData} />
          )}
        </div>
        </div>
      <div className="chart-wrapper">
        <div className="chart-box">
        <div className="chart-title">Pollutants Proportions</div>
          <LineChartMenu
            locations={locationsNames}
            selectedLocation={donutChartLocation}
            onLocationChange={handleDonutLocationChange}
            onTimeRangeChange={handleDonutTimeRangeChange}
          />
          {isLoadingDonutChart ? (<Loading />) : (
            cityData && <DonutChart chartData={donutChartData} />
            )}
        </div>
      </div>
    </div>
  );
};

export default CityBoard;
