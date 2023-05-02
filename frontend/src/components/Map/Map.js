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
import {CreateMarkers} from "./Markers/CreateMarkers";

function Map() {
    const [map, setMap] = useState(null);
    const mapElement = useRef(null);
    const [trafficLayerIsVisible, setTrafficLayerIsVisible] = useState(false);
    const [showTrafficCaption, setShowTrafficCaption] = useState(false);
    const [is2D, setIs2D] = useState(false);
    const [heatmapLayerIsVisible, setHeatmapLayerIsVisible] = useState(false);
    const [showHeatmapCaption, setShowHeatmapCaption] = useState(false);
    const [heatmapLayer, setHeatmapLayer] = useState(false);


    /*
    const [bragaAirData, setBragaAirData] = useState({});
    const [portoAirData, setPortoAirData] = useState({});
    const [lisboaAirData, setLisboaAirData] = useState({});
    const [faroAirData, setFaroAirData] = useState({});

     */
    const [bragaWeatherData, setBragaWeatherData] = useState({});
    const [portoWeatherData, setPortoWeatherData] = useState({});
    const [lisboaWeatherData, setLisboaWeatherData] = useState({});
    const [faroWeatherData, setFaroWeatherData] = useState({});


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
            autocompleteOptions: {
                key: "dBUez1ApxtAcqGPmPUKmKMFTE7SiKgba",
                language: "en-GB",
            },
        };

        const ttSearchBox = new SearchBox(services, searchBoxOptions);

        ttSearchBox.on("tomtom.searchbox.resultselected", handleSearchResultSelection);

        // controls
        map.addControl(new tt.NavigationControl());
        map.addControl(new tt.ScaleControl());
        map.addControl(new tt.GeolocateControl());
        map.addControl(ttSearchBox, "top-left");

        // on load
        map.on("load", function () {
            setMap(map);
            setTrafficLayerIsVisible(false);
            setShowTrafficCaption(false);
            setIs2D(false);
            setHeatmapLayerIsVisible(false);
            setShowHeatmapCaption(false);
        });
    }, []);

    // create Heatmap layer
    useEffect(() => {
        fetch('http://localhost:3001/map')
            .then(res => res.json())
            .then(data => {
                // create Layer and setLayer
                const HeatMapLayer = {
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
                };
                setHeatmapLayer(HeatMapLayer);
                // Add the heatmap layer to the map
                if (map && !map.getSource('density')) {
                    map.addLayer(HeatMapLayer);
                    map.setLayoutProperty('density', 'visibility', 'none');
                }
            })
            .catch(err => {
                console.error(err);
            });

        // Fetch data every 30 minutes
        const intervalId = setInterval(() => {
            fetch('http://localhost:3001/map')
                .then(res => res.json())
                .then(data => {
                    // Update Layer and setLayer
                    const HeatMapLayer = {
                        ...heatmapLayer,
                        source: {
                            type: 'geojson',
                            data,
                        },
                    };
                    setHeatmapLayer(HeatMapLayer);
                    // Update the heatmap layer on the map
                    // check if the layer is created before set the data
                    map.getSource('density').setData(data);
                })
                .catch(err => {
                    console.error(err);
                });
        }, 30 * 60 * 1000); // 30 minutes in milliseconds

        // Clear the interval on unmount
        return () => clearInterval(intervalId);
    }, [map]);

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
        if (map && heatmapLayerIsVisible && map.getSource('density')) {
            map.setLayoutProperty('density', 'visibility', 'visible');
            setShowHeatmapCaption(true);
        } else if (map && map.getSource('density'))  {
            map.setLayoutProperty('density', 'visibility', 'none');
            setShowHeatmapCaption(false);
        }
    }, [map, heatmapLayerIsVisible]);


    useEffect(() => {
        const fetchCityWeatherData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/maps/weather`
                );
                const citiesWeatherData = await response.json();

                // set air data variables
                setBragaWeatherData(citiesWeatherData['Braga']);
                setPortoWeatherData(citiesWeatherData['Porto']);
                setLisboaWeatherData(citiesWeatherData['Lisboa']);
                setFaroWeatherData(citiesWeatherData['Faro']);
            } catch (error) {
                console.error("Error fetching weather data: " + error);
            }
        }

        // fetch data on mount
        fetchCityWeatherData().then(() => console.log("Weather data fetched"));

        // fetch data every 30 minutes
        const intervalId = setInterval(fetchCityWeatherData, 30 * 60 * 1000);

        // clear interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (map && bragaWeatherData && portoWeatherData && lisboaWeatherData && faroWeatherData) {
            const weatherData = {
                bragaWeatherData,
                portoWeatherData,
                lisboaWeatherData,
                faroWeatherData
            }
            CreateMarkers(map, weatherData);
        }
    }, [map,
        bragaWeatherData,
        portoWeatherData,
        lisboaWeatherData,
        faroWeatherData]);


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

    function handleSearchResultSelection(event) {
        const { data } = event;
        const { position } = data.results[0];
        map.flyTo(position, { zoom: 15 });
    }

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