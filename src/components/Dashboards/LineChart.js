import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ cityData }) {

    if (!cityData || Object.keys(cityData).length === 0) {
        return <div>
            <h1>Loading...</h1>
            cityData: {cityData}
        </div>;
    }

    // extract chart data from cityData
    const chartData = cityData.datasets;
    const chartOptions = {
        // chart options
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm'
                    }
                }
            }
        }
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default LineChart;