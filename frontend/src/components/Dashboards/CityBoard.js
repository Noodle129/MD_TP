import React, { useEffect, useState } from 'react';
import LineChart from './LineChart/LineChart';
import generateLineChart from '../../utils/Charts/GenerateLineCharts';
import 'chart.js/auto';
import LineChartMenu from './LineChart/LineChartMenu';
import {useParams} from "react-router";
import Loading from '../../utils/Animations/Loading';

const CityBoard = () => {

    const { cityName } = useParams();
    const [cityData, setCityData] = useState({})
    const [location, setLocation] = useState("");
    const [locationsNames, setLocationsNames] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [timeRange, setTimeRange] = useState('none');

    // fetch city data
    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const capitalizedStr = cityName.charAt(0).toUpperCase() + cityName.slice(1);
                const response = await fetch(`http://localhost:3001/cities/${capitalizedStr}`);
                const cityData = await response.json();
                setCityData(cityData);
                const locationNames = Object.keys(cityData);
                setLocationsNames(locationNames)
                setLocation(locationNames[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCityData().then(r => console.log("City data fetched successfully"));
        // fetch city data every 6 seconds
        const interval = setInterval(() => {
            fetchCityData();
        }, 6000);

        // clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [cityName]);

    useEffect(() => {
        if (location && timeRange && Object.keys(cityData).length > 0) {
            const chartData = generateLineChart(cityData, location, timeRange);
            setChartData(chartData);
        }
    }, [location, timeRange, cityData]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    }

    if (Object.keys(cityData).length === 0) {
        return <Loading/>;
    }

    return (
        <div>
            <div>
            <h1>Air Quality in {cityName}</h1>
                <div style={{ width: "75vw", height: "75vh" }}>
                <LineChartMenu
                    locations={locationsNames}
                    selectedLocation={location}
                    onLocationChange={handleLocationChange}
                    onTimeRangeChange={handleTimeRangeChange}
                />
                {cityData && <LineChart chartData={chartData}/>}
                </div>
            </div>
        </div>
    );
};

export default CityBoard;