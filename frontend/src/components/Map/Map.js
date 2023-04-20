import React, { useState, useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './TrafficData/ToggleContainer.css';
import './TrafficData/TrafficLayerButton.css'
import faRoad from '@fortawesome/fontawesome-free-solid/faRoad';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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

        map.addControl(new tt.NavigationControl());
        map.addControl(new tt.FullscreenControl());

        map.on("load", function () {
            setMap(map);
        });


    }, []);

    const toggleTrafficLayer = () => {
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
