import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home"
import Maps from "./components/Pages/Maps"
import Cities from "./components/Pages/Cities"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Pages/Login";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/cities/braga" render={() => <Cities city="braga" />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}


export default App;
