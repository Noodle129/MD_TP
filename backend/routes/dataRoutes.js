const express = require('express');
const router = express.Router();
const { saveData, getCityData, generateChartData } = require('../controllers/dataController');
const { ref } = require('../models/dataModel');

// Route for saving data in Firebase Realtime Database
router.get('/', async (req, res) => {
    const city = 'Braga';
    const country = 'PT'; //alterar !!!

    try {
        await saveData(city, country);
        res.status(200).send('Data saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data!');
    }
});


router.get('/cities/:city', async (req, res) => {
    // get city name from URL
    const city = req.params.city;
    const country = 'PT';
    try {
        const cityData = await getCityData(city, country);
        res.status(200).json(cityData);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error getting data for ${city}!`);
    }
});


module.exports = router;
