// create HeatMap Caption
import React from 'react';
import './HeatCaption.css';

const HeatCaption = () => {
    return (
        <div className="caption caption-show">
            <div className="caption-title">AQI Levels by EPA</div>
            <div className="caption-item">
                <div className="caption-color green-light"></div>
                <div className="catpion-label">Good (0-50)</div>
            </div>
            <div className="caption-item">
                <div className="caption-color green-dark"></div>
                <div className="caption-label">Moderate (51-100)</div>
            </div>
            <div className="caption-item">
                <div className="caption-color yellow"></div>
                <div className="caption-label">Unhealthy for Sensitive Groups (101-150)</div>
            </div>
            <div className="caption-item">
                <div className="caption-color orange"></div>
                <div className="caption-label">Unhealthy (151-200)</div>
            </div>
            <div className="caption-item">
                <div className="caption-color red"></div>
                <div className="caption-label">Very Unhealthy (201-300)</div>
            </div>
            <div className="caption-item">
                <div className="caption-color maroon"></div>
                <div className="caption-label">Hazardous (301-500)</div>
            </div>
        </div>
    );
};

export default HeatCaption;
