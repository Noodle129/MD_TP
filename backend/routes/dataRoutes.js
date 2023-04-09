const express = require('express');
const router = express.Router();
const { saveData } = require('../controllers/dataController');
const { ref } = require('../models/dataModel');

// Route for saving data in Firebase Realtime Database
router.post('/', async (req, res) => {
    const { city, parameter } = req.body;
    try {
        await saveData(city, parameter);
        res.status(200).send('Data saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data!');
    }
});


// Rota para a página /cities/braga

module.exports = router;
