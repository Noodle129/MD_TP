import moment from "moment";

function generateLineChart(cityData, location, timeRange) {
    if (!cityData[location]) {
        throw new Error(`Location "${location}" not found in city data.`);
    }

    if (!cityData[location].records) {
        throw new Error(`No records found for location "${location}".`);
    }

    // determine start and end timestamps for desired time range
    const now = Date.now();
    let start;
    let labelFormat;
    // set start time to the earliest timestamp available in the data when timeRange is 'none'
    if (timeRange === 'none') {
        // set start time to the earliest timestamp available in the data
        const timestamps = Object.values(cityData[location].records).map(record => record.timestamp);
        start = Math.min(...timestamps);
        // display full date and time
        labelFormat = 'MMM D, YYYY, h:mm A';
    } else if (timeRange === 'day') {
        start = now - 24 * 60 * 60 * 1000;
        labelFormat = 'h A'; // display hours with AM/PM format
    } else if (timeRange === 'week') {
        start = now - 7 * 24 * 60 * 60 * 1000;
        labelFormat = 'ddd'; // display day of the week
    } else if (timeRange === 'month') {
        start = now - 30 * 24 * 60 * 60 * 1000;
        // display week of the month
        labelFormat = 'MMM Do';
    }
    else {
        throw new Error(`Invalid time range "${timeRange}".`);
    }

    // create an array of pollutants from 1st record
    const pollutants_record1 = Object.keys(cityData[location].records[Object.keys(cityData[location].records)[0]]);

    if (!pollutants_record1) {
        throw new Error(`There are no pollutants in location "${location}" records.`);
    }

    const datasets = [];
    let chartLabels = [];
    let i = 0;

    // loop through each pollutant
    for (const pollutant of pollutants_record1) {
        const chartData = [];

        // loop through each record for the current pollutant
        for (const recordId in cityData[location].records) {
            const record = cityData[location].records[recordId];
            const valueForPollutant = record[pollutant].value;
            const timestampForPollutant = record[pollutant].timestamp;

            // only include records that fall within desired time range, or include all data if timeRange is 'none'
            if (timeRange === 'none' || timestampForPollutant >= start) {
                // add record to chartData array
                chartData.push({
                    x: timestampForPollutant,
                    y: valueForPollutant,
                });

                // format timestamp for display on x-axis
                const formattedLabel = moment(timestampForPollutant).format(labelFormat);
                if (!chartLabels.includes(formattedLabel)) {
                    chartLabels.push(formattedLabel);
                }
            }
        }

        // sort chartData by timestamp
        chartData.sort((a, b) => a.x - b.x);
        // create array of chart labels from sorted chartData array
        chartLabels = chartData.map(dataPoint => moment(dataPoint.x).format(labelFormat));


        // Generate a pastel color for the line based on the index of the pollutant
        const hue = (i * 137.508) % 360;
        const borderColor = `hsl(${hue}, 80%, 70%)`;
        i++;

        // Add a new dataset to the array for the current pollutant
        datasets.push({
            label: `${pollutant}`,
            data: chartData,
            fill: false,
            borderColor: borderColor,
        });
    }

    // set options


    // create chart data object
    return {
        labels: chartLabels,
        datasets: datasets,
    };
}


export default generateLineChart;


