const express = require('express');
const router = express.Router();
const { saveData, drawBarChart} = require('../controllers/dataController');
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
router.get('/cities/braga', (req, res) => {
    ref.child("air-quality-data/PT/Braga").once("value", (snapshot) => {
        const records = snapshot.val().records;
        const chartData = drawBarChart(records);
        res.render('braga', { chartData });
    });
});
module.exports = router;
