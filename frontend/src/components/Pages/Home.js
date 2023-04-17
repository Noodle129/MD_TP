import React from "react";
import BackImage from "../Background/BackImage";
import InfoSection from "../InfoSection";
import {homeObjOne, homeObjThree, homeObjTwo} from "../InfoSection/Data";
function Home () {
    return (
        <>
            <BackImage/>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
        </>
    );
}

export default Home;