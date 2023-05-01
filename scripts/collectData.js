// imports
// Initialize Firebase
const { initializeApp } = require("firebase/app");
const {getDatabase,
    ref,
    set,
    update,
    get} = require("firebase/database");
const uuid = require('uuid');

// Config Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdXTrlTHsE-sSrcJJOLQMhmXl7TO41tVA",
    authDomain: "sensorizacao.firebaseapp.com",
    databaseURL: "https://sensorizacao-default-rtdb.firebaseio.com",
    projectId: "sensorizacao",
    storageBucket: "sensorizacao.appspot.com",
    messagingSenderId: "881514112131",
    appId: "1:881514112131:web:ddda6728c1e46291d7e7b6",
    measurementId: "G-C32L4MF41Y"
};

const appFirebase = initializeApp(firebaseConfig);
const database = getDatabase(appFirebase);

// Utility functions
// Fetch data from API OpenAQ
async function fetchData(city,country) {
    try {
        const url = `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=${country}&city=${city}&order_by=lastUpdated&dumpRaw=false`;
        const response = await fetch(url);
        const data = await response.json();
        const openAQData = {};

        data.results.forEach(result => {
            const locationId = result.location;
            if (!openAQData[locationId]) {
                openAQData[locationId] = {
                    coordinates: {
                        latitude: result.coordinates.latitude,
                        longitude: result.coordinates.longitude
                    },
                    measurements: {}
                };
            }

            result.measurements.forEach(measurement => {
                openAQData[locationId].measurements[measurement.parameter] = {
                    value: measurement.value,
                    lastUpdated: Date.parse(measurement.lastUpdated) / 1000,
                    timestamp: Date.now()
                };
            });
        });
        return openAQData;
    } catch (error) {
        console.error('Error fetching data from OpenAQ API:', error);
    }
}

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

async function main() {
    // global variables
    const country = "PT";
    const cities = ["Lisboa", "Porto", "Braga", "Faro"];
    let i = 0;

    // MAIN CODE
    // fetch data from OpenAQ and save it to Firebase
    try {
        for (i = 0; i < cities.length; i++) {
            await saveData(cities[i], country);
        }
    } catch (err) {
        console.error(`Error getting data from Firebase in city ${cities[i]}:`, err);
    }
}

main();
