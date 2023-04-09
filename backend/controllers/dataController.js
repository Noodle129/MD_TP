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
const uuid = require('uuid');
const d3 = import('d3');


// Save data in Firebase Realtime Database
async function saveData(city, country) {
    try {
        // get data from API and parse it
        const data = await fetchData(city, country);
        console.log(data);

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
        console.log('Data saved successfully');

    } catch (error) {
        console.error('Error saving data:', error);
    }
}

async function drawBarChart(cityName) {
    const snapshot = await ref.child("air-quality-data/PT/" + cityName).once("value");
    const cityData = snapshot.val();

    const records = Object.values(cityData).map((station) => station.records);
    const flattenedRecords = Object.assign(...records);

    const barChartData = Object.entries(flattenedRecords).map(([key, value]) => {
        return {
            pollutant: key,
            concentration: value.value,
        };
    });

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
        .create("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    x.domain(barChartData.map((d) => d.pollutant));
    y.domain([0, d3.max(barChartData, (d) => d.concentration)]);

    svg
        .selectAll(".bar")
        .data(barChartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.pollutant))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.concentration))
        .attr("height", (d) => height - y(d.concentration));

    svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    return svg.node().outerHTML;
}

function getCityData(req, res) {
    const city = req.params.city;

    ref.child("air-quality-data/PT/" + city).once("value", (snapshot) => {
        const records = snapshot.val().records;
        const chartData = drawBarChart(records);

        res.json(chartData); // Envio dos dados para o front-end
    });
}

module.exports = {
    saveData,
    getCityData,
};
