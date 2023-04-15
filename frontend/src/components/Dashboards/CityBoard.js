import React, { useEffect, useState } from 'react';
import LineChart from './LineChart/LineChart';
import generateLineChart from '../../utils/GenerateLineCharts';
import 'chart.js/auto';
import LineChartMenu from './LineChart/LineChartMenu';
import {useParams} from "react-router";

const CityBoard = ({ cityData }) => {
    // get first location as default
    const { cityName } = useParams();
    const locations = Object.keys(cityData);
    const defaultLocation = locations[0];
    const [location, setLocation] = useState(defaultLocation);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [timeRange, setTimeRange] = useState('none');


    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    }


    useEffect(() => {
        const chartData = generateLineChart(cityData, location, timeRange);
        setChartData(chartData);
    }, [cityData, location, timeRange]);


    return (
        <div>
            <div>
            <h1>Air Quality in {cityName}</h1>
                <div style={{ width: "75vw", height: "75vh" }}>
                <LineChartMenu
                    locations={locations}
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