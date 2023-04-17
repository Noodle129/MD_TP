const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const {saveData} = require("./controllers/dataController");
const app = express();

// npm run devStart
// sudo netstat -plten |grep node
// kill -9 PID

app.use(express.json());

// Middleware to allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Define Routes
// Task 1: Handle requests from the client
app.use('/', dataRoutes);

// define threads
// Task 2: get data from Firebase and save them
setInterval(async () => {
        try {
            // main cities in Portugal
            const city1 = 'Lisboa';
            const city2 = 'Porto';
            const city3 = 'Braga';
            const country = 'PT';
            await saveData(city1, country);
            await saveData(city2, country);
            await saveData(city3, country);
        } catch (err) {
            console.error("Error getting data from Firebase:", err);
        }
    }, 6000);

// define PORT
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
async function main() {
    try {
    } catch (error) {
        console.error(error);
    }
}

main();*/