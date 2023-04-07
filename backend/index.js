const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const {saveData} = require("./controllers/dataController");
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
app.get('/', (req, res) => {
    res.send('Hello World!');
}   );

const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// save data to Firebase
saveData("Braga", "PT").then(r => console.log(r));
saveData("Lisboa", "PT").then(r => console.log(r));