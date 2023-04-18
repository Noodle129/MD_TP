const express = require('express');
const router = express.Router();
const { getCityData } = require('../controllers/dataController');


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


module.exports = router;
