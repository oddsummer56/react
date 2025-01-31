import React, {useEffect} from "react";
import {loadSession, removeSession} from "../../scripts/common";

function LogoutCallback() {


    useEffect(() => {
        removeSession("isLogin")
        removeSession("kakaoToken")
        removeSession("visited")

        if(!loadSession("kakaoToken")) window.location.href="/"
    })

    return <div style={{textAlign:"center", height:"calc(100vh - 125px - 145px)"}}>
            <img src={"/static/media/loading.gif"} alt="loading" id={"loading"} style={{zIndex: 9999, width: "70%"}} />
            {/*position:"absolute"  "z-index:10;position:absolute;top: 25vh;left: 15vw;right:0;bottom:0;width: 70vw;"*/}
            <h3>카카오 로그아웃이 진행중입니다.</h3>
            <h3>잠시만 기다려주세요.</h3>
        </div>
}

export default LogoutCallback;
