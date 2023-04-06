import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home"
import Maps from "./components/Pages/Maps"
import Cities from "./components/Pages/Cities"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/maps" element={<Maps />} />
            </Routes>
        </Router>
    );
}


export default App;
