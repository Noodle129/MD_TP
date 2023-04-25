const express = require('express');
const router = express.Router();
const { getCityData, getLatestData, calculateAQI, createGeoJSON} = require('../controllers/dataController');


router.get('/cities/:city', async (req, res) => {
    // get city name from URL
    const country = 'PT';
    const city = req.params.city;

    try {
        const cityData = await getCityData(city, country);

        if (Object.keys(cityData).length === 0) {
            res.status(404).send(`No data found in the database`);
        } else {
        res.status(200).json(cityData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error getting data for ${city}!`);
    }
});


router.get('/map', async (req, res) => {
    // get city name from URL
    const country = 'PT';
    const cities = ['Braga', 'Porto', 'Lisboa', 'Faro']
    let geojson = {
        type: 'FeatureCollection',
        name: 'Cities AQI Data',
        crs: {
            type: 'name',
            properties: {
                name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
            }
        },
        features: []
    };

    try {
        for (const city of cities) {
            // get data from database
            const cityData = await getCityData(city, country);
            const latestData = getLatestData(cityData);
            const AQIs = calculateAQI(latestData);
            geojson = createGeoJSON(geojson, AQIs);
        }

        console.log(geojson);

        // check if dict is empty
        if (Object.keys(geojson).length === 0) {
            res.status(404).send(`No data found in the database`);
        } else {
            res.status(200).json(geojson);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error getting data for heatmap!`);
    }
});

module.exports = router;
