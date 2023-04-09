import React from 'react';
import Cards from '../CardItems/Cards';
//import Dashboard from '../DashBoard/Dashboard';
//import { Route, Routes } from 'react-router-dom';
/*
<Routes>
    <Route path="/cities/braga" element={<DashBoard > data={chartData} />} />
    </Routes>

const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('/cities/braga')
            .then(res => res.json())
            .then(data => setChartData(data));
    }, []);
*/

function Cities() {
    return (
        <>
            <Cards />
        </>
    );
}

export default Cities;
