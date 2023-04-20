const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const {saveData, interpolateData} = require("./controllers/dataController");

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
/*setInterval(async () => {
        try {
            // main cities in Portugal
            const city1 = 'Lisboa';
            const city2 = 'Porto';
            const city3 = 'Braga';
            const city4 = 'Faro';
            const country = 'PT';
            await saveData(city1, country);
            await saveData(city2, country);
            await saveData(city3, country);
           await saveData(city4, country);
        } catch (err) {
            console.error("Error getting data from Firebase:", err);
        }
    }, 6000000);*/

// define PORT
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function main() {
    try {
        const data = {
            "PT01041": {
                "coordinates": {
                    "latitude": 41.549722,
                    "longitude": -8.405833
                },
                "records": {
                    "023192a1-d3cd-4d48-ab7e-1d63939f49fc": {
                        "no2": {
                            "lastUpdated": 1681671600,
                            "timestamp": 1681687137544,
                            "value": 0
                        },
                        "pm10": {
                            "lastUpdated": 1681671600,
                            "timestamp": 1681687137544,
                            "value": 20.4
                        }
                    },
                    "03207572-180f-435b-ad34-249ddf3f44cf": {
                        "no2": {
                            "lastUpdated": 1681563600,
                            "timestamp": 1681597360510,
                            "value": 1.2
                        },
                        "pm10": {
                            "lastUpdated": 1681563600,
                            "timestamp": 1681597360510,
                            "value": 1.9
                        },
                    },
                }
            },
            "PT01042": {
                "coordinates": {
                    "latitude": 41.149722,
                    "longitude": -8.610556
                },
                "records": {
                    "023192a1-d3cd-4d48-ab7e-1d63939f49fc": {
                        "no2": {
                            "lastUpdated": 1681671600,
                            "timestamp": 1681687137544,
                            "value": 0
                        },
                    },
                }
            },
        };

        const options = {
            gridType: 'square',
            property: 'concentration',
            weight: 2,
            units: 'kilometers',
            resolution: 50
        };

        const formattedData = await interpolateData(data, options)
        console.log(JSON.stringify(formattedData));

    } catch (error) {
        console.error(error);
    }
}

main();