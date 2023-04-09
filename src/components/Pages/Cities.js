import React, {useEffect, useState} from 'react'
import Cards from "../CardItems/Cards";
import BarChart from "../Charts/barChart";

function Cities() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('/cities/braga')
            .then(res => res.json())
            .then(data => setChartData(data));
    }, []);

    return (
        <>
            <Cards/>
            <BarChart data={chartData} />
        </>
    )
}

export default Cities;
