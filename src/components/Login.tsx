import React, {useRef} from "react";
import {useNavigate} from "react-router-dom"

import "../css/login.css";
import kakaoLogin from "../img/kakao_login_medium_narrow.png"
import {loadSession, pwEncode, removeSession, saveSession} from "../scripts/common";

function Login() {

    const navigate = useNavigate()

    const idRef=useRef<HTMLInputElement>(null);
    const pwRef=useRef<HTMLInputElement>(null);


    const loginLogic=async ()=>{
        if((idRef.current && idRef.current.value.length>=4) && (pwRef.current&&pwRef.current.value.length>=8)){

            await fetch(`http://${process.env.REACT_APP_HOST}:8000/auth/login`, {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                //body: JSON.stringify({id:id.value, pw:encSHA256(pw.value)})
                body: JSON.stringify({id:idRef.current?idRef.current.value:"", password:pwRef.current?pwEncode(pwRef.current.value):""})
            })
                .then(response=> response.json())
                .then(json=> {
                        saveSession("loginToken", json["access_token"]);
                        saveSession("refreshToken", json["refresh_token"]);
                        saveSession("isLogin", true);
                        saveSession("userNm", json["username"])
                        saveSession("userType", json["user_type"])
                })
                .then(()=>{
                    if (loadSession("isLogin")){
                        if((loadSession("loginToken")!=="undefined" || loadSession("refreshToken"))!=="undefined"){
                            window.location.href="/";
                            //navigate("/")
                        }
                        else {
                            removeSession("loginToken")
                            removeSession("refreshToken")
                            removeSession("isLogin")
                            alert("로그인 과정에서 오류가 생겼습니다.\n다시 시도해주세요.")
                        }
                    }
                    else {
                        alert("로그인 과정에서 오류가 생겼습니다.\n다시 시도해주세요.")
                    }
                })
                .catch(err=>console.error(err))
        }
    }

    const kakao=()=> {
        window.location.href=`http://${process.env.REACT_APP_HOST}:8000/kakao/getcode`;
        //navigate(`http://${process.env.REACT_APP_HOST}:8000/kakao/getcode`)
    }

    const join=()=>{
        const btn_close:HTMLElement|null = document.getElementById("btn-close")
        if (btn_close) btn_close.click()
        navigate("/join")
    }
    const onKeyUp=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.keyCode===13) loginLogic()
    }

    return (
        <>
            <div data-bs-toggle="modal" data-bs-target="#loginModal" className={"headerTopBtn"} id={"loginBtn"}>  </div>

            <div className="modal fade" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">로그인</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" id={"btn-close"}></button>
                        </div>
                        <form id={"loginForm"}>
                            <div className="modal-body" id={"loginForm"}>
                                <div className="form-floating mb-3">
                                    {/*<input type="text" className="form-control" id="floatingInput" {...id} placeholder="ID" required minLength={4} maxLength={15} />*/}
                                    <input type="text" className="form-control" id="floatingInput" ref={idRef} placeholder="ID" required minLength={4} maxLength={15} />
                                    <label htmlFor="floatingInput">아이디</label>
                                </div>
                                <div className="form-floating">
                                    {/*<input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...pw} required minLength={8} maxLength={20} />*/}
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={pwRef} required minLength={8} maxLength={20} onKeyUp={onKeyUp} />
                                    <label htmlFor="floatingPassword">비밀번호</label>
                                </div>
                            </div>
                            <div className="modal-footer" id={"login-footer"}>
                                {/*<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                                <button type="button" className="btn btn-primary" onClick={loginLogic} >로그인</button>
                                <img src={kakaoLogin} alt={"kakaoLoginBtn"} id={"kakaoLoginBtn"} onClick={kakao}/>
                                <button type="button" className="btn btn-primary" onClick={join}>회원가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;



