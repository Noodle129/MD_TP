import React, { useState, useEffect } from 'react';
import LineChart from "./LineChart";

function Braga() {
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        async function fetchCityData() {
            try {
                const response = await fetch(`/cities/Braga`);
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCityData().then(r => console.log("fetchCityData done"));
    }, []);

    return (
        <div>
            <h1>Braga</h1>
            {cityData && <LineChart data={cityData} />}
        </div>
    );
}

export default Braga;

