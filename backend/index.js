const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const {ref} = require("./models/dataModel");
const {getCityData, generateChartData} = require("./controllers/dataController");
const {writeFileSync} = require("fs");
const app = express();
// npm run devStart
//sudo netstat -plten |grep node
// kill -9 PID
app.use(express.json());

// Middleware to allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Define Routes
app.use('/', dataRoutes);
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function main() {
    try {
        const cityData = await getCityData('Braga', 'PT');
        const chartData = await generateChartData(cityData, 'no2', 'PT01041');
        console.log(JSON.stringify(chartData));
        // enviar para o front
    } catch (error) {
        console.error(error);
    }
}

main();