export function processCityData(cityData) {
    const chartData = {
        labels: [],
        datasets: [
            {
                label: 'Pollutants Concentration',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    // loop through the data and add it to the chart data object
    const records = cityData.records;
    for (const record in records) {
        chartData.labels.push(records[record].lastUpdated);
        chartData.datasets[0].data.push(records[record].no2.value);

    }

    return chartData;
}
