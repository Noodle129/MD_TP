const { fetchData } = require('../services/openaq');
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

function getLast24hData(data) {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // milliseconds
    const now = Date.now();

    const filteredData = {};

    for (const [location, locationData] of Object.entries(data)) {
        filteredData[location] = {};
        // get coordinates
        filteredData[location].coordinates = locationData.coordinates;
        for (const [, recordData] of Object.entries(locationData.records)) {
            for (const [pollutant, pollutantData] of Object.entries(recordData)) {
                if (pollutantData.timestamp >= now - TWENTY_FOUR_HOURS) {
                    if (!(pollutant in filteredData[location])) {
                        filteredData[location][pollutant] = [];
                    }
                    filteredData[location][pollutant].push(pollutantData.value);
                }
            }
        }
    }
    return filteredData;
}

// calculate overall AQI
// Portuguese Environment Agency (APA)
// based on the recommendations of the World Health Organization (WHO)
// and European Union (EU).
function calculateAQI(data) {
    console.log('DATA: ', data);
    const breakpoints = [
        { pollutant: 'no2', conc: [0, 50, 100, 200, 400, 1000], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'pm10', conc: [0, 20, 40, 70, 100, 200], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'o3', conc: [0, 54, 70, 85, 105, 200], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'so2', conc: [0, 50, 100, 200, 350, 500], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'co', conc: [0, 2, 9, 15, 30, 40], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'pm25', conc: [0, 10, 20, 25, 50, 800], aqi: [0, 50, 100, 150, 200, 300, 400] },
        {pollutant: 'pm1', conc: [0, 10, 20, 25, 50, 800], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'um010', conc: [0, 20, 40, 60, 80, 100], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'um025', conc: [0, 20, 40, 60, 80, 100], aqi: [0, 50, 100, 150, 200, 300, 400] },
        { pollutant: 'um100', conc: [0, 50, 100, 150, 200, 300], aqi: [0, 50, 100, 150, 200, 300, 400] }
        // add more pollutants here
    ];

    const aqiForConcentration = (pollutant, conc) => {
        const bp = breakpoints.find(bp => bp.pollutant === pollutant);
        const i = bp.conc.findIndex(c => c > conc) - 1;
        const cLow = bp.conc[i];
        const cHigh = bp.conc[i + 1];
        const aqiLow = bp.aqi[i];
        const aqiHigh = bp.aqi[i + 1];
        return Math.round(((aqiHigh - aqiLow) / (cHigh - cLow)) * (conc - cLow) + aqiLow);
    };

    const overallAQI = {};

    for (const [location, locationData] of Object.entries(data)) {
        // calculate AQI for each pollutant
        overallAQI[location] = {aqi: 0, details: {}, coordinates: locationData.coordinates};
        delete locationData.coordinates;
        for (const [pollutant, concentrations] of Object.entries(locationData)) {
            const meanConcentration = concentrations.reduce((sum, c) => sum + c, 0) / concentrations.length;
            console.log(`Mean concentration of ${pollutant} in ${location}: ${meanConcentration}`);
            const pollutantAQI = aqiForConcentration(pollutant, meanConcentration);
            overallAQI[location].details[pollutant] = pollutantAQI;
            overallAQI[location].aqi = Math.max(overallAQI[location].aqi, pollutantAQI);
        }
    }
    // returns an object with the overall AQI for each location
    // and the AQI for each pollutant
    return overallAQI;
}

// get latest record
function getLatestData(data) {
    const latestData = {};

    for (const [location, locationData] of Object.entries(data)) {
        latestData[location] = {};
        // get coordinates
        latestData[location].coordinates = locationData.coordinates;

        const latestRecords = {};
        for (const [, recordData] of Object.entries(locationData.records)) {
            for (const [pollutant, pollutantData] of Object.entries(recordData)) {
                if (!(pollutant in latestRecords) || pollutantData.timestamp > latestRecords[pollutant].timestamp) {
                    latestRecords[pollutant] = pollutantData;
                }
            }
        }

        for (const [pollutant, pollutantData] of Object.entries(latestRecords)) {
            if (!(pollutant in latestData[location])) {
                latestData[location][pollutant] = [];
            }
            latestData[location][pollutant].push(pollutantData.value);
        }
    }

    return latestData;
}

// get file geo
/*
function getFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Failed to read file ${filePath}: ${error.message}`);
        return null;
    }
}*/

function createGeoJSON(geoJSON, data) {
    for (const [key, value] of Object.entries(data)) {
        const point = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    value.coordinates.longitude,
                    value.coordinates.latitude
                ]
            },
            properties: {
                id: key,
                ...value
            }
        };
        geoJSON.features.push(point);
    }
    return geoJSON;
}

module.exports = {
    saveData,
    getCityData,
    calculateAQI,
    getLatestData,
    createGeoJSON,
};
