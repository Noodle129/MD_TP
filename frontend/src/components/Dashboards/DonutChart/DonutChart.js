import {Doughnut} from "react-chartjs-2";
function DonutChart({ chartData}) {
    return <Doughnut data={chartData}/>;
}

export default DonutChart;