const { fetchData } = require('../services/openaq');
const { database,
    ref ,
    child,
    set,
    query,
    push,
    update,
    orderByChild,
    limitToLast,
    get}  = require('../models/dataModel');

// Save data in Firebase Realtime Database
async function saveData(city, country) {
    // get data from API and parse it
    const data = await fetchData(city, country);

    // create object to store in Firebase
    const firebaseData = {};
    data.forEach(result => {
        const locationId = result.location;
        const recordId = push(ref(database, `/${country}/${city}/${locationId}`)).key;
        firebaseData[locationId] = {
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude,
        };
        // add measurements to the record
        result.measurements.forEach(measurement => {
            const parameter = measurement.parameter;
            const value = measurement.value;

            // add measurement to firebaseData
            update(ref(database, `/${country}/${city}/${locationId}/${recordId}`), {
                [parameter]: {
                    value: value,
                    timestamp: new Date(measurement.lastUpdated).getTime(),
                }
            });
        });
    });

    // save data to Firebase
    try {
        console.log(`Data to be saved:`, firebaseData);
        console.log(`Saving data for ${country}, ${city}...`);
    } catch (error) {
        console.error(`Error while saving data`, error);
    }
}




module.exports = {
    saveData,
};
