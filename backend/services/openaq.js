const axios = require('axios');

// Fetch data from API OpenAQ
async function fetchData(city,country) {
    const url = `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=${country}&city=${city}&order_by=lastUpdated&dumpRaw=false`;
    const response = await axios.get(url);
    const results = response.data.results;
    const data = {};

    results.forEach(result => {
        const locationId = result.location;
        // get coordinates
        const coordinates = {
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude
        };

        // get measurements
        const measurements = result.measurements.map(measurement => {
            return {
                parameter: measurement.parameter,
                value: measurement.value,
                timestamp: new Date(measurement.lastUpdated).getTime(),
            };
        });

        if (!data[country]) {
            data[country] = {};
        }
        if (!data[country][city]) {
            data[country][city] = {};
        }
        if (!data[country][city][locationId]) {
            data[country][city][locationId] = {
                coordinates: coordinates,
                measurements: measurements
            };
        } else {
            data[country][city][locationId].measurements.concat(measurements);
        }
    });

    return results;
}

module.exports = {
    fetchData,
};
