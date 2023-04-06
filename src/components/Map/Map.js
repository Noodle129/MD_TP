import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './marker_icon.png';
import { SearchControl } from 'react-leaflet-search';

function MapSection() {
    const [position] = useState([41.547275, -8.427557]);
    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    return (
        <MapContainer
            id="mapid"
            center={position}
            zoom={10}
            scrollWheelZoom={false}
            className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapSection;
