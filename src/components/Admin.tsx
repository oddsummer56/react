import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Visualize from "./Visualize";
import {loadSession} from "../scripts/common";


function Admin() {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState<boolean>(loadSession("userType")==="1");


    useEffect(() => {
        if(!isAdmin){
            alert("접근권한이 없습니다.")
            navigate("/")
        }
    }, []);

    return isAdmin?(
        <div id="adminContainer" style={{textAlign: "center"}}>
            <h1>Dashboard</h1>
            <button className={"btn btn-warning"} onClick={()=>{navigate(-1)}}  style={{position: "relative", left: "30vw", top: "-10px"}} >뒤로가기🔙 </button>
            <div style={{paddingLeft: "170px", height: "800px", position: "relative"}}>
                <Visualize />
            </div>
        </div>
    ):<></>;
}

export default Admin;
