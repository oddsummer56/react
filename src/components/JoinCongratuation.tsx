import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import "../css/join.css"
import joinFinTitle from "../img/join1.png"
import optionalAgree from "../img/join2.png"
import agree_y from "../img/agree_y.png"
import agree_n from "../img/agree_n.png"
import {loadSession, removeSession} from "../scripts/common";

function JoinCongratuation(props: { [key: string]: string|null }) {

    const [name, setName] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const agreeYN=searchParams.get("agree");

    const goHome = () => {
        //window.location.href="/";
        navigate("/")
    }
    const login = () => {
        const loginBtn = window.document.getElementById("loginBtn")
        if(loginBtn) loginBtn.click()
    }

    useEffect(() => {
        setName(loadSession("userName"))
    }, []);

    return (
        <div id={"joinCongratuation"}>
            <span id={"joiner"}>{name}</span>
            <img id={"joinFinTitle"} src={joinFinTitle} alt={"님! 가입을 환영합니다"} />
            <img id={"optionalAgree"} src={optionalAgree} alt={"마케팅 수신 동의 (선택)"} /><br/>
            {agreeYN==="true" ? <img className={"optionalAgreeYN"} src={agree_y} alt={"동의"} /> : <img className={"optionalAgreeYN"} src={agree_n} alt={"비동의"} />}
            <div>
                <button className={"btn btn-primary"} style={{margin:"30px 15px"}} onClick={login} >로그인하기</button>
                <button className={"btn btn-primary"} style={{margin:"30px 15px"}} onClick={goHome} >홈으로 돌아가기</button>
            </div>
        </div>
    )
        ;
}

export default JoinCongratuation;

