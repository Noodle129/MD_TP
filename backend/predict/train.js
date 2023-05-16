const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs');
const { DataFrame } = require('dataframe-js');

// Load the data from a CSV file
const csvPath = 'braga_air_data_cleaned_aqi.csv';

// Function to normalize the input features
function normalizeFeatures(features) {
    const numFeatures = features[0].length;
    const normalizedFeatures = [];

    for (let i = 0; i < numFeatures; i++) {
        const column = features.map(row => parseFloat(row[i]));
        const minValue = Math.min(...column);
        const maxValue = Math.max(...column);

        const normalizedColumn = column.map(value => (value - minValue) / (maxValue - minValue));

        // add epsilon to avoid NaN values
        normalizedColumn.forEach((value, index) => {
            if (isNaN(value)) {
                normalizedColumn[index] = Number.EPSILON;
            }
        });

        normalizedFeatures.push(normalizedColumn);
    }

    return transpose(normalizedFeatures);
}

// Function to transpose a matrix
function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Read the CSV file
fs.readFile(csvPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the CSV data
    const rows = data.split('\n');
    const header = rows[0].split(',');
    const values = rows.slice(1).map(row => row.split(','));

    // Create the DataFrame
    const df = new DataFrame(values, header);

    // Remove the header from the features
    const featuresHeader = header.filter(colName => colName !== 'AQI');
    let featuresValues = df.drop('AQI').toArray();

    // Normalize the input features
    // featuresValues = normalizeFeatures(featuresValues);

    // Prepare the input features and target variable
    const features = tf.tensor2d(featuresValues, [featuresValues.length, featuresValues[0].length], 'float32');
    const target = tf.tensor2d(df.select('AQI').toArray(), [featuresValues.length, 1], 'float32');

    // Create the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 25, activation: 'relu', inputShape: [featuresValues[0].length] }));
    model.add(tf.layers.dense({ units: 1 }));

    const learningRate = 0.001;
    const clipValue = 0.5; // Set the maximum value to clip the gradients
    const optimizer = tf.train.adam(learningRate, 0.1, 0.5, 0.999, 1e-8, clipValue);

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: optimizer });

    // Train the model using the data.
    model.fit(features, target, { epochs: 7, batchSize : 32 })
        .then(() => {
            console.log('Training completed.');

            // Make predictions using the model and compare them to the actual values
            const predictions = model.predict(features).arraySync();
            console.log('Predictions:', predictions);
            console.log('Actual Values:', target.arraySync());
        })
        .catch(err => {
            console.error('Error during training:', err);
        });
});
