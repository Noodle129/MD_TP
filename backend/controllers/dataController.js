const { fetchData } = require('../services/openaq');
const turf = require('@turf/turf');
const { database,
    ref ,
    set,
    update,
    onValue,
    get}  = require('../models/dataModel');

const uuid = require('uuid');

// Save data in Firebase Realtime Database
async function saveData(city, country) {
    try {
        // get data from API and parse it
        const data = await fetchData(city, country);

        for (const locationId in data) {
            // create a reference to the location
            const locationRef = ref(database, 'air-quality-data/' + country + '/' + city + '/' + locationId);
            const locationCoord = data[locationId].coordinates;
            const locationMeasures = data[locationId].measurements;
            const records = {};

            // check if location already exists
            const locationSnapshot = await get(locationRef);

            if (locationSnapshot.exists()) {
                // location already exists, add new records to existing object
                const existingLocationData = locationSnapshot.val();
                for (const recordId in existingLocationData.records) {
                    records[recordId] = existingLocationData.records[recordId];
                }
                // add new record to records object with unique ID
                records[uuid.v4()] = locationMeasures;
                // update location object with new records
                await update(locationRef, { records: records });
            } else {
                // location doesn't exist, create new object with coordinates and records
                // generate a unique ID for the record
                const recordId = uuid.v4();
                // add the measurement data to the records object with the unique ID as the key
                records[recordId] = locationMeasures;
                const locationObject = {
                    coordinates: locationCoord,
                    records: records,
                };
                // add location object to Firebase
                await set(locationRef, locationObject);
            }
        }
        console.log('data from OpenAQ API saved successfully in Firebase');

    } catch (error) {
        console.error('Error saving data from OpenAQ API to Firebase:', error);
    }
}

// get data from a specific city in Firebase Realtime Database
function getCityData(city, country) {
    return new Promise((resolve, reject) => {
        try {
            // create a reference to the city
            const cityRef = ref(database, 'air-quality-data/' + country + '/' + city);
            // listen for changes to the city data
            onValue(cityRef, (snapshot) => {
                const citySnapshot = snapshot.val();
                console.log(`Data from ${city} in Firebase has been updated`);
                resolve(citySnapshot);
            });
        } catch (error) {
            console.error(`Error getting data from ${city} in Firebase:`, error);
            reject(error);
        }
    });
}

// convert to GeoJSON
function convertToGeoJSON(data) {
    const features = [];

    for (const [locationID, locationData] of Object.entries(data)) {
        const coordinates = [
            locationData.coordinates.longitude,
            locationData.coordinates.latitude
        ];

        const values = [];

        for (const record of Object.values(locationData.records)) {
            for (const [pollutantName, pollutantData] of Object.entries(record)) {
                const existingValue = values.find(v => v[pollutantName]);

                if (existingValue) {
                    existingValue[pollutantName].values.push({
                        timestamp: pollutantData.timestamp,
                        value: pollutantData.value
                    });
                } else {
                    values.push({
                        [pollutantName]: {
                            values: [{ timestamp: pollutantData.timestamp, value: pollutantData.value }]
                        }
                    });
                }
            }
        }

        features.push({
            type: "Feature",
            properties: {
                id: locationID,
                values
            },
            geometry: {
                type: "Point",
                coordinates
            }
        });
    }

    return {
        type: "FeatureCollection",
        features
    };
}

// interpolate data
async function interpolateData(data, options) {
    // Format the data as GeoJSON
    const geoJSON = convertToGeoJSON(data);
    // Interpolate the data to a regular grid using IDW
    return turf.interpolate(geoJSON, options);
}

module.exports = {
    saveData,
    getCityData,
    interpolateData,
};
