import React, { useState, useEffect, useRef } from 'react';
import tt, {services} from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-plugin-searchbox';
import './TrafficData/TrafficButton/TrafficLayerButton.css'
import './TrafficData/RotationButton/RotationButton.css'
import faRoad from '@fortawesome/fontawesome-free-solid/faRoad';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import Caption from "../Map/TrafficData/TrafficCaption/Caption";
import HeatCaption from "../Map/HeatData/HeatCaption/HeatCaption";
import {faAdjust, faArrowsAlt} from "@fortawesome/fontawesome-free-solid";
//import {CreateMarkers} from "./Markers/CreateMarkers";

function Map() {
    const [map, setMap] = useState(null);
    const mapElement = useRef(null);
    const [trafficLayerIsVisible, setTrafficLayerIsVisible] = useState(false);
    const [showTrafficCaption, setShowTrafficCaption] = useState(false);
    const [is2D, setIs2D] = useState(false);
    const [heatmapLayerIsVisible, setHeatmapLayerIsVisible] = useState(false);
    const [showHeatmapCaption, setShowHeatmapCaption] = useState(false);

    /*
    const [bragaAirData, setBragaAirData] = useState({});
    const [portoAirData, setPortoAirData] = useState({});
    const [lisboaAirData, setLisboaAirData] = useState({});
    const [faroAirData, setFaroAirData] = useState({});
    const [bragaWeatherData, setBragaWeatherData] = useState({});
    const [portoWeatherData, setPortoWeatherData] = useState({});
    const [lisboaWeatherData, setLisboaWeatherData] = useState({});
    const [faroWeatherData, setFaroWeatherData] = useState({});
     */


    useEffect(() => {

        const map = tt.map({
                key: 'dBUez1ApxtAcqGPmPUKmKMFTE7SiKgba',
                container: mapElement.current,
                basePath: '/sdk',
                theme: {
                    style: 'main',
                    layer: 'basic',
                },
                center: [-8.4229, 41.55176],
                zoom: 6,
                pitch: 60,
                refresh: 300000,
            }
        );


        const searchOptions = {
            key: 'dBUez1ApxtAcqGPmPUKmKMFTE7SiKgba',
            language: "en-GB",
            limit: 20,
            idxSet: 'POI'
        };

        const searchBoxOptions = {
            minNumberOfCharacters: 2, // minimum number of characters required before suggestions are shown
            searchOptions: searchOptions, // types of locations to search for (optional)
        };

        const ttSearchBox = new SearchBox(services, searchBoxOptions);

        // controls
        map.addControl(new tt.NavigationControl());
        map.addControl(new tt.FullscreenControl());
        map.addControl(ttSearchBox, "top-left");

        // on load
        map.on("load", function () {
            setMap(map);
            setTrafficLayerIsVisible(false);
            setShowTrafficCaption(false);
            setIs2D(false);
            setHeatmapLayerIsVisible(false)
            setShowHeatmapCaption(false)

            // create Heatmap layer
            fetch('http://localhost:3001/map')
                .then(res => res.json())
                .then(data => {
                    map.addLayer({
                        id: 'density',
                        source: {
                            type: 'geojson',
                            data,
                        },
                        type: 'heatmap',
                        paint: {
                            'heatmap-radius': [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0, 10,
                                14, 100,
                                22, 200
                            ],
                            'heatmap-weight': {
                                type: 'exponential',
                                property: 'aqi',
                                stops: [
                                    [0, 0],
                                    [50, 1],
                                    [100, 2],
                                    [150, 3],
                                    [200, 4],
                                    [300, 5],
                                    [500, 6],
                                ],
                            },
                            'heatmap-color': [
                                'interpolate',
                                ['linear'],
                                ['heatmap-density'],
                                0, 'rgba(0, 255, 0, 0)',
                                0.1, 'rgb(0, 255, 0)',
                                0.2, 'rgb(255, 255, 0)',
                                0.3, 'rgb(255, 165, 0)',
                                0.4, 'rgb(255, 69, 0)',
                                0.5, 'rgb(128, 0, 0)',
                                1, 'rgb(128, 0, 0)'
                            ]
                        },
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        });
    }, []);

    // toggle traffic layer effect
    useEffect(() => {
            if (map && trafficLayerIsVisible) {
                map.showTrafficFlow();
                setShowTrafficCaption(true)
            } else if (map) {
                map.hideTrafficFlow();
                setShowTrafficCaption(false)
            }
        }, [map, trafficLayerIsVisible]);

    // toggle 2D/3D effect
    useEffect(() => {
        if (map && is2D) {
            map.setPitch(0);
        } else if (map) {
            map.setPitch(60);
        }
    }, [is2D]);

    // toggle heatmap layer effect
    useEffect(() => {
        if (map && heatmapLayerIsVisible) {
            map.setLayoutProperty('density', 'visibility', 'visible');
            setShowHeatmapCaption(true)
        } else if (map) {
            map.setLayoutProperty('density', 'visibility', 'none');
            setShowHeatmapCaption(false)
        }
    }, [map, heatmapLayerIsVisible]);

    /*
    useEffect(() => {
    const fetchCityAirData = async () => {
        try {
           const cities = ['Braga', 'Porto', 'Lisboa', 'Faro']
            // send individual requests for each city
          for (const city of cities) {
                const response = await fetch(
                    `http://localhost:3001/maps/air/${city}`
                );
                const cityData = await response.json();

                if (city === 'Braga') {
                    setBragaAirData(cityData);
                } else if (city === 'Porto') {
                    setPortoAirData(cityData);
                } else if (city === 'Lisboa') {
                    setLisboaAirData(cityData);
                } else if (city === 'Faro') {
                    setFaroAirData(cityData);
                }
            }
        } catch (error) {
            console.error(error);
            if (error.message === "No data found in the database") {
                alert("No data found in the database");
            }
        }
    };

    const fetchCityWeatherData = async () => {
        try {
            const cities = ['Braga', 'Porto', 'Lisboa', 'Faro']
            // send individual requests for each city
            for (const city of cities) {
                const response = await fetch(
                    `http://localhost:3001/maps/weather/${city}`
                );
                const cityData = await response.json();

                if (city === 'Braga') {
                    setBragaWeatherData(cityData);
                } else if (city === 'Porto') {
                    setPortoWeatherData(cityData);
                } else if (city === 'Lisboa') {
                    setLisboaWeatherData(cityData);
                } else if (city === 'Faro') {
                    setFaroWeatherData(cityData);
                }
            }
        } catch (error) {
            console.error(error);
            if (error.message === "No data found in the database") {
                alert("No data found in the database");
            }
        }
    };
    fetchCityAirData().then(() => console.log("City air data fetched successfully"));
    fetchCityWeatherData().then(() => console.log("City weather data fetched successfully"));
    // fetch city data every 6 seconds
    const interval = setInterval(() => {
        fetchCityAirData().then(() =>
            console.log("City air data fetched successfully")
        );
        fetchCityWeatherData().then(() =>
            console.log("City weather data fetched successfully")
        );
    }, 60000);

    // clean up the interval when the component unmounts
    return () => clearInterval(interval);
}, [map]);


    useEffect(() => {
        // create markers for each city with for loop
        // create list of objects of cityData
        const cities = [
            {
                name: 'Braga',
                airData: bragaAirData,
                weatherData: bragaWeatherData,
            },
            {
                name: 'Porto',
                airData: portoAirData,
                weatherData: portoWeatherData,
            },
            {
                name: 'Lisboa',
                airData: lisboaAirData,
                weatherData: lisboaWeatherData,
            },
            {
                name: 'Faro',
                airData: faroAirData,
                weatherData: faroWeatherData,
            },
        ];

        for (let i = 0; i <= cities.length; i++){
            CreateMarkers(map, cities[i].airData, cities[i].weatherData)
        }
    }, [bragaAirData, portoAirData, lisboaAirData, faroAirData, bragaWeatherData, portoWeatherData, lisboaWeatherData, faroWeatherData]);
     */

    const toggleTrafficLayer = () => {
        setTrafficLayerIsVisible(!trafficLayerIsVisible);
        setShowTrafficCaption(!showTrafficCaption);
    };

    const toggleHeatMap = () => {
        setHeatmapLayerIsVisible(!heatmapLayerIsVisible);
        setShowHeatmapCaption(!showHeatmapCaption);
    };

    const to2D = () => {
        setIs2D(!is2D);

    };

    return (
        <div>
            <div ref={mapElement} style={{ width: '100%', height: '1000px' }} />
            <div style={{ position: 'absolute', top: '226px', right: '8px' }}>
                <button className="traffic-button" onClick={toggleTrafficLayer}>
                    <FontAwesomeIcon icon={faRoad} size="lg" color={trafficLayerIsVisible ? '#00b4d8' : '#6c757d'} />
                </button>
                <button className="rotation-button" onClick={to2D}>
                    <FontAwesomeIcon icon={faArrowsAlt} size="lg" color={is2D ? '#00b4d8' : '#6c757d'} />
                </button>
                {showTrafficCaption && <Caption />}
                <button className="rotation-button" onClick={toggleHeatMap}>
                    <FontAwesomeIcon icon={faAdjust} size="lg" color={heatmapLayerIsVisible ? '#00b4d8' : '#6c757d'} />
                </button>
                {showHeatmapCaption && <HeatCaption />}
            </div>
        </div>
    );
}

export default Map;