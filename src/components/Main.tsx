import React, {useEffect} from "react";
import "../css/main.css";

import SearchBar from "./SearchBar";
import Banner from "./Banner";
import WeeklyBest from "./WeeklyBest";
import {getLocalTime, loadSession, saveSession} from "../scripts/common";
import ExclusiveBy from "./ExclusiveBy";
import ThisWeekend from "./ThisWeekend";

function Main() {

    useEffect(() => {
        saveSession("today",getLocalTime())
        if(loadSession("visited")===null){
            saveSession("visited","[]")
        }
    })

    return (
        <div className="App">
            <SearchBar />
            <Banner />
            <ThisWeekend />

            <ExclusiveBy />
            <WeeklyBest />
        </div>
    );
}

export default Main;
