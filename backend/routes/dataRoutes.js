const express = require('express');
const router = express.Router();
const { getCityData } = require('../controllers/dataController');


router.get('/cities/:city', async (req, res) => {
    // get city name from URL
    const country = 'PT';
    const city = req.params.city;

    try {
        const cityData = await getCityData(city, country);
        res.status(200).json(cityData);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error getting data for ${city}!`);
    }
});


module.exports = router;
