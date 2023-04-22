import React, { useState, useEffect, useRef } from 'react';
import tt, {services} from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-plugin-searchbox';
import './TrafficData/ToggleContainer.css';
import './TrafficData/TrafficLayerButton.css'
import faRoad from '@fortawesome/fontawesome-free-solid/faRoad';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";

function Map() {
    const [map, setMap] = useState(null);
    const mapElement = useRef(null);
    const [trafficLayerIsVisible, setTrafficLayerIsVisible] = useState(false);

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
            zoom: 14,
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

        const updateSearchOptions = function () {
            let options = ttSearchBox.getOptions();
            options.searchOptions.boundingBox = map.getBounds();
            ttSearchBox.updateOptions(options);
            console.log(options)
        }
        // controls
        map.addControl(new tt.NavigationControl());
        map.addControl(new tt.FullscreenControl());
        map.addControl(ttSearchBox, "top-left");

        ttSearchBox.on('tomtom.searchbox.suggestsreceived', function(event) {
            const results = event.data.results;
            updateSearchOptions(results);
        });

        // on load
        map.on("load", function () {
            setMap(map);
            setTrafficLayerIsVisible(false)

        });


    }, []);

    const toggleTrafficLayer = () => {
        setTrafficLayerIsVisible()
        if (trafficLayerIsVisible) {
            map.hideTrafficFlow();
        } else {
            map.showTrafficFlow();
        }
        setTrafficLayerIsVisible(!trafficLayerIsVisible);
    };


    return (
        <div>
            <div ref={mapElement} style={{ width: '100%', height: '1000px' }} />
            <div style={{ position: 'absolute', top: '226px', right: '8px' }}>
                <button className="traffic-button" onClick={toggleTrafficLayer}>
                    <FontAwesomeIcon icon={faRoad} size="lg" color={trafficLayerIsVisible ? '#00b4d8' : '#6c757d'} />
                </button>
            </div>
        </div>
    );
}

export default Map;
