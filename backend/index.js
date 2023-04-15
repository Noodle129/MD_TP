const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const {ref} = require("./models/dataModel");
const {getCityData} = require("./controllers/dataController");
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
app.use('/', dataRoutes);
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
async function main() {
    try {
        const CityData = {
            "PT01041": {
                "coordinates": {
                    "latitude": 41.549722,
                    "longitude": -8.405833
                },
                "records": {
                    "0077f922-3d37-44bb-8b01-b2faf9282242": {
                        "no2": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059271748,
                            "value": 1
                        },
                        "pm10": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059271748,
                            "value": 2
                        }
                    },
                    "0330a9c8-b425-4a01-8c21-0167121c6031": {
                        "no2": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059367748,
                            "value": 3
                        },
                        "pm10": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059367748,
                            "value": 4
                        }
                    },
                }
            },
            "PT01042": {
                "coordinates": {
                    "latitude": 41.549722,
                    "longitude": -8.405833
                },
                "records": {
                    "0077f922-3d37-44bb-8b01-b2faf9282242": {
                        "no2": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059271748,
                            "value": 0
                        }
                    },
                    "0330a9c8-b425-4a01-8c21-0167121c6031": {
                        "no2": {
                            "lastUpdated": 1681023600,
                            "timestamp": 1681059367748,
                            "value": 1
                        }
                    },
                }
            }
        }

        const filteredData = generateLineChart(
            CityData,
            'PT01041'
        );
        console.log(filteredData);
        // enviar para o front
    } catch (error) {
        console.error(error);
    }
}

main();*/