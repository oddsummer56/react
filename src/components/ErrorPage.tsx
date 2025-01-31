import React from "react";
import {useNavigate} from "react-router-dom";

import "../css/error.css"


function ErrorPage() {

    const navigate=useNavigate()
    const back=()=>{
        navigate(-1)
    }


    return (<div id={"noPage"}>
        <br/>
        <h1>⛔ 페이지가 존재하지 않습니다.</h1>
    <br/>
    <div>방문하시려는 페이지의 주소가 잘못 입력되었거나,</div>
    <div>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</div>
    <div>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</div>
    <br/>
    <button className={"btn btn-danger"} onClick={back}>뒤로가기</button>
        </div>)
    ;
}

export default ErrorPage;

