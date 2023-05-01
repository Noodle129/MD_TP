import React from 'react';
import tt from '@tomtom-international/web-sdk-maps';

export function CreateMarkers(map, weatherData) {
      for (const locationName in weatherData) {
            const locationData = weatherData[locationName];

            if (!locationData.coordinates || !locationData.coordinates.latitude || !locationData.coordinates.longitude) {
                  console.error(`Missing coordinates for location ${locationName}`);
                  continue;
            }

            const position = [locationData.coordinates.longitude, locationData.coordinates.latitude];

            let weatherHTML = "<p>Weather</p>";
            const weatherDataObj = locationData.weatherData;
            for (const [weatherType, weatherValue] of Object.entries(weatherDataObj)) {
                  if (weatherType === 'lastUpdated') {
                        const lastUpdate = new Date(weatherValue);
                        weatherHTML += `<p>Last update: ${lastUpdate}</p>`;
                  } else if (weatherType !== 'atualTimestamp') {
                        weatherHTML += `<p>${weatherType}: ${weatherValue}</p>`;
                  }
            }

            new tt.Marker({
                  anchor: "bottom",
                  draggable: false,
            }).setLngLat(position).setPopup(new tt.Popup({ offset: 30 }).setHTML(weatherHTML)).addTo(map);
      }
}
