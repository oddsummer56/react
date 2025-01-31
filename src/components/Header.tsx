import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import "../css/header.css";
import Login from "./Login";
import logo from "../img/TicketMoa-logo.png"
import {loadSession, removeSession} from "../scripts/common";

function Header() {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const join=()=>{
        navigate("/join")
    }

    const index=()=>{
        navigate("/")
        window.location.reload();
    }

    const logout= async ()=>{

        if(loadSession("kakaoToken")!==null){
            //window.location.href="http://localhost:8000/logout";
            await fetch(`http://${process.env.REACT_APP_HOST}:8000/kakao/logout`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": loadSession("kakaoToken") as string
                },
                //body:JSON.stringify({"kakaoToken":loadSession("kakaoToken")})
            })
                .then(response=> window.location.href=response["url"])
                .catch(err=> {
                    console.error(err)
                    alert("오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.")
                })
        } else {
            fetch(`http://${process.env.REACT_APP_HOST}:8000/auth/logout`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": loadSession("loginToken") as string
                },
                //body:JSON.stringify({"token":loadSession("loginToken")})
            })
                //.then(resp=> console.log(resp))

            removeSession("isLogin")
            removeSession("loginToken")
            removeSession("refreshToken")
            removeSession("userNm")
            removeSession("userType")
            removeSession("visited")

            if(!loadSession("refreshToken")) navigate("/")//window.location.href="/"
        }


    }
    
    const topMenu=(cat:string)=>{
        navigate("/search?query=&region=&start_date=&end_date=&category="+encodeURIComponent(cat)+"&currPage=1")
        window.location.reload()
    }

const selected=()=>{
    const cat = searchParams.get("category")
    let elem;

    if (cat==="콘서트") {
        elem = window.document.getElementById("concertBtn")
    } else if (cat==="뮤지컬/연극") {
        elem = window.document.getElementById("musicalBtn")
    } else if (cat==="전시/행사") {
        elem = window.document.getElementById("exhibitBtn")
    }

    if(elem) elem.id=elem.id+"Selected"
}

    useEffect(() => {
        selected()
    }, []);

    return (
        <div id={"header"}>
            <div className={"headerComponents"} id={"headerTop"}>
                <img src={logo} alt="Logo" onClick={index} id="logo" className={"headerTopBtn"} />
                {!loadSession("isLogin") ? <div onClick={join} className={"headerTopBtn"} id={"joinBtn"}></div> : <div style={{alignSelf:"center"}}>
                    <span style={{color:"#595959", fontSize:"23px", marginRight:"10px", verticalAlign:"middle"}}>{loadSession("userNm")}님 안녕하세요</span>
                    <button className="btn btn-warning" onClick={() => { navigate("/visited") }}>방문기록</button>
                    { loadSession("userType")==="1"?
                        <button className="btn btn-danger" onClick={() => { navigate("/admin") }}>ADMIN</button>
                        : <></>
                    }
                </div>}
                {!loadSession("isLogin") ? <Login/> : <div onClick={logout} className={"headerTopBtn"} id={"logoutBtn"} ></div>}
            </div>
            <div className={"headerComponents"} id={"headerBot"}>
                <div className={"headerBotBtn"} onClick={()=>{topMenu("콘서트")}} id={"concertBtn"} ></div>
                <div className={"headerBotBtn"} onClick={()=>{topMenu("뮤지컬/연극")}} id={"musicalBtn"} ></div>
                <div className={"headerBotBtn"} onClick={()=>{topMenu("전시/행사")}} id={"exhibitBtn"} ></div>
                <div> </div>
            </div>
        </div>
    );
}

export default Header;
