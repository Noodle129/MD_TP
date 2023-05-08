import {Bar} from "react-chartjs-2";
function HorizontalBarChart({chartData, options}) {
    return <Bar data={chartData} options={options}/>;
}

export default HorizontalBarChart;