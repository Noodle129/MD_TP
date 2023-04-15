import React, { Component } from "react";
import BackImage from "../Background/BackImage";
import InfoSection from "../InfoSection";
import {homeObjOne, homeObjThree, homeObjTwo} from "../InfoSection/Data";
class Home extends Component {
    componentDidMount() {
        fetch("http://localhost:3001", {
            method: "GET",
        })
            .then((response) => response.text())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <>
                <BackImage />
                <InfoSection {...homeObjOne} />
                <InfoSection {...homeObjTwo} />
                <InfoSection {...homeObjThree} />
            </>
        );
    }
}

export default Home;

/*function Home() {
    return (
        <>
            <BackImage/>
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <InfoSection {...homeObjThree}/>
        </>
    )
}

export default Home;*/