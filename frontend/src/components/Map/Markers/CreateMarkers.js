import React from 'react';
import tt from '@tomtom-international/web-sdk-maps';

export function CreateMarkers(map, airQualityData, WeatherData) {
   // receives the city data in a JSON format, receives only the most recent register
    /* Air Quality Data
       {
       "PT10410":
        {
        coordinates:
          {
          latitude: 38.7167,
          longitude: -9.1333
          },
         {
        pollutants:
            {
            co: {
            value :0.2,
timestamp: "2021-04-27T15:00:00.000Z"
            },
            ...
            }
        }
      }
      -----------------
         weather:
            {
            "BRAGA":
                {
                coordinates:
                    {
                    latitude: 41.5503,
                    longitude: -8.4201
                    },
                weather:
                    {
                    temperature:{
                     value: 15.2,
                     unit: "C"

                    ...
                    }
                    timestamp: "2021-04-27T15:00:00.000Z"
                    }
                }
            }
         }
     */
   for (const [location, locationData] in Object.entries(airQualityData)) {
        // get the coordinates of the location
        const position = [locationData.coordinates.latitude, locationData.coordinates.longitude];
        // get the air quality data
        const airQuality = locationData.pollutants;
        // get timestamp of any pollutant
        // create HTML with the air quality data
        let airQualityHTML = "<p>Air Quality</p>";
        for (const [pollutant, pollutantData] in Object.entries(airQuality)) {
            // get timestamp of the pollutant in Date format
            const lastUpdate = new Date(pollutantData.timestamp);
            airQualityHTML += `<p>${pollutant}: ${pollutantData.value} ug/m3</p>`;
            // add last update to the HTML
            airQualityHTML += `<p>Last update: ${lastUpdate}</p>`;
        }

        // create markers for the air quality data
        const marker = new tt.Marker({
            anchor: "bottom",
            draggable: false,
        });
        marker.setLngLat(position);
        marker.addTo(map);
        marker.setPopup(
            new tt.Popup({ offset: 30 }).setHTML(airQualityHTML)
        );
    }

    for (const [location, locationData] in Object.entries(WeatherData)) {
          // get the coordinates of the location
          const position = [locationData.coordinates.latitude, locationData.coordinates.longitude];
          // get the weather data

          // create HTML with the air quality data
          let weatherHTML = "<p>Weather</p>";
          for (const [weatherType, weatherData] in Object.entries(locationData.weather)) {
              // get last update of the weather data
                const lastUpdate = new Date(weatherData.timestamp);
                weatherHTML += `<p>${weatherType}: ${weatherData.value} ${weatherData.unit}</p>`;
                // add last update to the HTML
                weatherHTML += `<p>Last update: ${lastUpdate}</p>`;
          }

          // create markers for the air quality data
          const marker = new tt.Marker({
                anchor: "bottom",
                draggable: false,
          });
          marker.setLngLat(position);
          marker.addTo(map);
          marker.setPopup(
                new tt.Popup({ offset: 30 }).setHTML(weatherHTML)
          );
     }
    return null;
}