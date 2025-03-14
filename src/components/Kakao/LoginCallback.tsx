import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {loadSession, removeSession, saveSession} from "../../scripts/common";
import axios from "axios";

function LoginCallback() {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const code=searchParams.get("code")

    if(!code){
        setTimeout(()=>{
            //window.location.href=`http://${process.env.REACT_APP_HOST}:3000`
            window.location.reload()
        },3000)
    }

    const login=async ()=>{
        // await fetch(`${process.env.REACT_APP_API_ENDPOINT}/kakao/getToken?code=`+code,{
        //     method: "GET"
        // })
        //     .then(res=> res.json())
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/kakao/getToken?code=`+code)
            .then(resp=>resp.data)
            .then((json) => {
                saveSession("userNm", json["nickname"])
                removeSession("loginToken");
                const accessToken = json["access_token"];
                axios.defaults.headers.common['Authorization'] = accessToken;
                saveSession("kakaoToken", accessToken)
                saveSession("userType", json["user_type"])
            } )
            .then(()=>{
                if(loadSession("kakaoToken")!=="") {
                    saveSession("isLogin", true);
                    //window.location.href = "/";
                    navigate("/")
                }
            })
            .catch(err => console.error(err) );
    }

    useEffect(() => {
        login()
    },[code])

    return code?
        <div style={{textAlign:"center", height:"calc(100vh - 125px - 145px)"}}>
            <img src={"/static/media/loading.gif"} alt="loading" id={"loading"} style={{zIndex: 9999, width: "70%"}} />
            <h3>카카오 로그인이 진행중입니다.</h3>
            <h3>잠시만 기다려주세요.</h3>
        </div> :
        <>
            <h3>코드가 존재하지 않습니다.</h3>
            <div>3초 후 초기페이지로 돌아갑니다.</div>
        </>;
}

export default LoginCallback;
