import React, { useEffect, useState } from "react";
import LineChart from "./LineChart/LineChart";
import {
  generateLineChart,
  generateBarChart,
  generateDonutChart,
  generateScatterChart,
} from "../../utils/Charts/GenerateCharts";
import "chart.js/auto";
import LineChartMenu from "./LineChart/LineChartMenu";
import { useParams } from "react-router";
import Loading from "../../utils/Animations/Loading";
import BarChart from "./BarChart/BarChart";
import DonutChart from "./DonutChart/DonutChart";
import ScatterChart from "./ScatterChart/ScatterChart";
import "./CityBoard.css";
import ScatterChartMenu from "./ScatterChart/ScatterChartMenu";
import 'react-toastify/dist/ReactToastify.css';


const CityBoard = () => {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState({});
  const [lineChartLocation, setLineChartLocation] = useState("");
  const [barChartLocation, setBarChartLocation] = useState("");
  const [donutChartLocation, setDonutChartLocation] = useState("");
  const [scatterChartLocation, setScatterChartLocation] = useState("");
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
  const [scatterTimeRange, setScatterTimeRange] = useState("none");
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [scatterChartData, setScatterChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barTimeRange, setBarTimeRange] = useState("none");
  let [flag, setFlag] = useState(0);
  const [isLoadingLineChart, setIsLoadingLineChart] = useState(true);
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true);
  const [isLoadingDonutChart, setIsLoadingDonutChart] = useState(true);
  const [isLoadingScatterChart, setIsLoadingScatterChart] = useState(true);
  const [scatterPollutants, setScatterPollutants] = useState([]);
  const [allPollutants, setAllPollutants] = useState([]);
  const [selectedScatterPollutants, setSelectedScatterPollutants] = useState(
    []
  );

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
        if (error.message === "No data found in the database") {
          alert("No data found in the database");
        }
      }
    };
    fetchCityData().then(() => console.log("City data fetched successfully"));
    // fetch city data every 6 seconds
    const interval = setInterval(() => {
      fetchCityData().then(() =>
        console.log("City data fetched successfully")
      );
    }, 6000);

    // clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [cityName]);

  useEffect(() => {
    // set locations info
    if (flag === 0 && Object.keys(cityData).length > 0) {
      const locationNames = Object.keys(cityData);
      setLocationsNames(locationNames);

      // get pollutants in the first record
      const scatterPollutants = Object.keys(
        cityData[locationNames[0]].records[
          Object.keys(cityData[locationNames[0]].records)[0]
        ]
      );

      const firstPollutant = scatterPollutants[0];
      if (locationNames.length > 0) {
        setLineChartLocation(locationNames[0]);
        setBarChartLocation(locationNames[0]);
        setDonutChartLocation(locationNames[0]);
        setScatterChartLocation(locationNames[0]);

        // get the first pollutant in the first location
        if (firstPollutant && scatterPollutants.length > 0) {
          // set scatter pollutants has a list with the first pollutant
          setScatterPollutants([firstPollutant]);
          setAllPollutants(scatterPollutants);
        }
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
    if (barChartLocation && barTimeRange && Object.keys(cityData).length > 0) {
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

  // generate scatter chart data
  useEffect(() => {
    if (
      scatterChartLocation &&
      scatterTimeRange &&
      Object.keys(cityData).length > 0 &&
      scatterPollutants.length > 0
    ) {
      setIsLoadingScatterChart(true);
      const scatterChartData = generateScatterChart(
        cityData,
        scatterChartLocation,
        scatterTimeRange,
        scatterPollutants
      );
      setScatterChartData(scatterChartData);
      setIsLoadingScatterChart(false);
    }
  }, [scatterChartLocation, scatterTimeRange, cityData, scatterPollutants]);

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

  const handleScatterLocationChange = (event) => {
    setScatterChartLocation(event.target.value);
  };

  const handleScatterTimeRangeChange = (event) => {
    setScatterTimeRange(event.target.value);
  };

  const onPollutantInsertion = (e) => {
    const selectedPollutant = e.target.value;

    // check if the selected pollutant is already in the selected pollutants array
    if (selectedScatterPollutants.includes(selectedPollutant)) {
      // alert
        alert("Pollutant already selected");
        return;
    }

    // add to list of selected pollutants
    const newSelectedPollutants = [
      ...selectedScatterPollutants,
      selectedPollutant,
    ];
    setSelectedScatterPollutants(newSelectedPollutants);

    // insert the selected pollutant into the scatter pollutants selected array
    const newScatterPollutants = [...scatterPollutants, selectedPollutant];
    setScatterPollutants(newScatterPollutants);

    const scatterChartData = generateScatterChart(
      cityData,
      scatterChartLocation,
      scatterTimeRange,
      scatterPollutants
    );
    setScatterChartData(scatterChartData);
  };

  const handleReset = () => {
    // remove all the selected pollutants from the scatter pollutants
    const newScatterPollutants = scatterPollutants.filter(
      (pollutant) => !selectedScatterPollutants.includes(pollutant)
    );
    setScatterPollutants(newScatterPollutants);
    setSelectedScatterPollutants([]);

    //generate the scatter chart data
    const scatterChartData = generateScatterChart(
      cityData,
      scatterChartLocation,
      scatterTimeRange,
      scatterPollutants
    );
    setScatterChartData(scatterChartData);
  };

  if (Object.keys(cityData).length === 0) {
    return <Loading />;
  }

  return (
      <div className="dashboard">
        <div className="chart-wrapper chart--medium">
          <div className="chart-box">
            <div className="chart-title">
              Pollutant Levels (ug/m3) over Time
            </div>
            <LineChartMenu
              locations={locationsNames}
              selectedLocation={lineChartLocation}
              onLocationChange={handleLineLocationChange}
              onTimeRangeChange={handleLineTimeRangeChange}
            />
            {isLoadingLineChart ? (
              <Loading />
            ) : (
              cityData && <LineChart chartData={lineChartData} />
            )}
          </div>
        </div>
      <div className="chart-wrapper chart--medium">
          <div className="chart-box">
            <div className="chart-title">Average Pollutants Levels</div>
            <LineChartMenu
              locations={locationsNames}
              selectedLocation={barChartLocation}
              onLocationChange={handleBarLocationChange}
              onTimeRangeChange={handleBarTimeRangeChange}
            />
            {isLoadingBarChart ? (
              <Loading />
            ) : (
              cityData && <BarChart chartData={barChartData} />
            )}
        </div>
        </div>
        <div className="chart-wrapper chart--small">
          <div className="chart-box">
            <div className="chart-title">Pollutants Proportions</div>
            <LineChartMenu
              locations={locationsNames}
              selectedLocation={donutChartLocation}
              onLocationChange={handleDonutLocationChange}
              onTimeRangeChange={handleDonutTimeRangeChange}
            />
            {isLoadingDonutChart ? (
              <Loading />
            ) : (
              cityData && <DonutChart chartData={donutChartData} />
            )}
          </div>
        </div>
        <div className="chart-wrapper chart--small">
          <div className="chart-box">
            <div className="chart-title">
              Pollutants Comparison (ug/m3) over Time
            </div>
            <ScatterChartMenu
              timeRange={scatterTimeRange}
              locations={locationsNames}
              selectedLocation={scatterChartLocation}
              onLocationChange={handleScatterLocationChange}
              onTimeRangeChange={handleScatterTimeRangeChange}
              onPollutantInsertion={onPollutantInsertion}
              pollutants={allPollutants}
              selectedPollutants={selectedScatterPollutants}
              handleReset={handleReset}
            />
            {isLoadingScatterChart ? (
              <Loading />
            ) : (
              cityData && <ScatterChart chartData={scatterChartData} />
            )}
          </div>
        </div>
      </div>
  );
};

export default CityBoard;
