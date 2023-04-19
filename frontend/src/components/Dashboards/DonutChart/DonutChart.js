import {Doughnut} from "react-chartjs-2";
function DonutChart({ chartData, options}) {
    return <Doughnut data={chartData} options={options}/>;
}

export default DonutChart;