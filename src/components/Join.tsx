import React, {useMemo, useRef, useState} from "react";
import "../css/join.css";
import {pwEncode, saveSession, verify} from "../scripts/common";
import AgreeModal from "./AgreeModal";
import Calendar from "./Calendar";
import AgreeTerm from "./AgreeTerm";
import AgreePersonal from "./AgreePersonal";
import AgreeMacketing from "./AgreeMacketing";


function Join() {

    const nameRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const helpMsgRef = useRef<HTMLDivElement>(null);
    const helpMsgPWRef = useRef<HTMLDivElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const pwChkRef = useRef<HTMLInputElement>(null);

    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);


    const agreeAllRef = useRef<HTMLInputElement>(null);
    const agreeAgeRef= useRef<HTMLInputElement>(null);
    const agreeTermsRef= useRef<HTMLInputElement>(null);
    const agreePersonalRef= useRef<HTMLInputElement>(null);
    const agreeMarketingRef= useRef<HTMLInputElement>(null);


    const [idDuplChk, setIdDuplChk] = useState(null);

    const debounce=(callback:Function, limit = 1000) =>{
        let timeout:NodeJS.Timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                /*@ts-ignore*/
                callback.apply(this);
            }, limit);
        };
    }

    const setIdHelp=async ()=>{
        if(idRef.current!==null){
           if (idRef.current.value.length<4){
                if(helpMsgRef.current!==null) {
                    helpMsgRef.current.innerHTML = "아이디는 4자 이상이어야 합니다."
                    helpMsgRef.current.classList.add("no");
                    helpMsgRef.current.classList.remove("ok");
                }
           } else {
               await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup/check-id`,{
                   method:"POST",
                   headers:{"Content-type":"application/json"},
                   body:JSON.stringify({id:idRef.current.value})
               })
                   .then(res => res.json())
                   .then(json=> json["is_taken"]===false)
                   .then((is_taken)=>{
                       (Boolean(is_taken))
                       if (is_taken){
                           setIdDuplChk(false)
                           if(helpMsgRef.current!==null) {
                               helpMsgRef.current.innerHTML = "사용 가능한 아이디입니다."
                               helpMsgRef.current.classList.remove("no");
                               helpMsgRef.current.classList.add("ok");
                           }
                       } else {
                           setIdDuplChk(true)
                           if(helpMsgRef.current!==null) {
                               helpMsgRef.current.innerHTML = "이미 사용중인 아이디입니다."
                               helpMsgRef.current.classList.add("no");
                               helpMsgRef.current.classList.remove("ok");
                           }
                       }
                   })
                   .catch(err => {
                           console.error(err)
                           alert("오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.")
                       }
                   )
           }
        }
    }
    const debouncedValidateId = useMemo(() => debounce(() => setIdHelp(), 350), [] );

    const pwCompare=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(pwRef.current!==null && pwChkRef.current!==null){
            if(helpMsgPWRef.current!==null){
                if(pwRef.current.value===pwChkRef.current.value) {
                    helpMsgPWRef.current.innerText = "설정한 비밀번호가 일치합니다."
                    helpMsgPWRef.current.classList.remove("no");
                    helpMsgPWRef.current.classList.add("ok");
                }
                else {
                    helpMsgPWRef.current.innerText = "설정한 비밀번호가 일치하지 않습니다."
                    helpMsgPWRef.current.classList.add("no");
                    helpMsgPWRef.current.classList.remove("ok");
                }
            }
        }
    }

    const toggle_agree_all=()=>{
        if(agreeAllRef.current){
            const agreeAll=!agreeAllRef.current.checked
            if(agreeAgeRef.current) agreeAgeRef.current.checked=!agreeAll;
            if(agreeTermsRef.current) agreeTermsRef.current.checked=!agreeAll;
            if(agreePersonalRef.current) agreePersonalRef.current.checked=!agreeAll;
            if(agreeMarketingRef.current) agreeMarketingRef.current.checked=!agreeAll;
        }
    }

    const submit=async ()=>{
        const birthday=document.getElementById("birthday") as HTMLInputElement;

        await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup/signup`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                username:nameRef.current?nameRef.current.value:"",
                id:idRef.current?idRef.current.value:"",
                pw:pwRef.current?pwEncode(pwRef.current.value):"",
                email:emailRef.current?emailRef.current.value:"",
                phoneNumber:phoneNumberRef.current?phoneNumberRef.current.value:"",
                gender:genderRef.current?genderRef.current.value:"",
                birthday:birthday!==null?birthday.value:"",
                agreeMarketing:agreeMarketingRef.current?agreeMarketingRef.current.checked.toString():false
            })
        })
            .then((resp) => resp.json())
            .then((json)=>{
            if(json){
                if(json["success"]) {
                    saveSession("userName", nameRef.current.value)
                    if(nameRef.current) alert(nameRef.current.value+"님!\n회원가입을 환영합니다!")
                    window.location.href = "/join/success?agree="+ (agreeMarketingRef.current?agreeMarketingRef.current.checked.toString():false)
                };
            }
        })
    }



    const submitChk=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        //if(!verify("nm",username.value)){
        if(nameRef.current!==null && !verify("nm",nameRef.current.value)){
            alert("이름을 입력해주세요.")
            setTimeout(()=>{
                if(nameRef.current!==null) nameRef.current.focus()
            }, 100);
            return
        }

        if(idDuplChk){   // id 중복체크
            alert("입력하신 아이디가 이미 존재합니다.")
            setTimeout(()=>{
                if(idRef.current) idRef.current.focus()
            }, 100);
            return
        }

        const gender = genderRef.current?genderRef.current.value:""
        if(gender===""){
            alert("성별을 입력해주세요")
            document.getElementById("gender").focus()
            return;
        } else {
            if (document.getElementById("birthday") as HTMLInputElement){
                const birthday = document.getElementById("birthday").value
                if(birthday===""){
                    alert("생년월일을 입력해주세요")
                    document.getElementById("birthday").focus()
                    return;
                }
            }
        }

        if (idRef.current!==null && verify("id", idRef.current.value)){
            if (pwRef.current!==null && verify("pw", pwRef.current.value)){
                if (pwChkRef.current!==null && pwRef.current.value===pwChkRef.current.value){
                    //if (agreeAge.valueOf() &&  agreeTerms.valueOf() && agreePersonal.valueOf()){
                    if ( (agreeAgeRef.current?agreeAgeRef.current.checked:false) &&  (agreeTermsRef.current?agreeTermsRef.current.checked:false) && (agreePersonalRef.current?agreePersonalRef.current.checked:false) ){
                        submit()
                    } else {
                        alert("서비스 이용에 동의해주세요")
                    }
                } else {
                    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
                    setTimeout(()=>{
                        if(pwChkRef.current) pwChkRef.current.focus()
                    }, 100);
                    return
                }
            } else {
                alert("비밀번호는 영문, 숫자, 특수문자를 조합하여 8~20자리로 입력해야 합니다.")
                setTimeout(()=>{
                    if(pwRef.current) pwRef.current.focus()
                }, 100);
                return
            }
        } else {
            alert("아이디는 영문, 숫자를 조합하여 4~15자리로 입력해야 합니다.")
            setTimeout(()=>{
                if(idRef.current) idRef.current.focus()
            }, 100);
            return
        }
    }

    const phoneChk=()=>{
        const phone= phoneNumberRef.current?phoneNumberRef.current.value:""
        if(phoneNumberRef.current!==null && !verify("pn",phone)){
            phoneNumberRef.current.value=phoneNumberRef.current.value.substring(0,phoneNumberRef.current.value.length-1);
        }
    }

    return (
        <>
            <hr/>
            <h2>회원가입</h2>
            <hr/>
            <form>
                <h5>필수정보</h5>
                <hr/>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">이름</label>
                    <input type="text" className="form-control" id="username" ref={nameRef} placeholder={"이름을 입력해주세요"}
                           maxLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputId" className="form-label">아이디</label>
                    <input type="text" className="form-control" id="inputId" aria-describedby="idHelp" ref={idRef}
                           placeholder={"4~15자리 영문, 숫자로 입력해주세요"} onChange={debouncedValidateId} minLength={4} maxLength={15}/>
                    <div id="idHelp" className="form-text" ref={helpMsgRef}></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">비밀번호</label>
                    <input type="password" className="form-control" id="inputPassword1" ref={pwRef}
                           placeholder={"8~20자리 영문, 숫자, 특수문자(!@#$%&)로 입력해주세요"} minLength={8} maxLength={20}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword2" className="form-label">비밀번호 확인</label>
                    <input type="password" className="form-control" id="inputPassword2" ref={pwChkRef}
                           onKeyUp={pwCompare} placeholder={"비밀번호를 한번 더 입력해주세요"} minLength={8} maxLength={20}/>
                    <div id="pwHelp" className="form-text" ref={helpMsgPWRef}></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">성별</label>
                    <select className="form-select" aria-label="Gender" id={"gender"} ref={genderRef} >
                        <option value="" selected>- 선택 -</option>
                        <option value="M">남</option>
                        <option value="F">여</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">생년월일</label><br/>
                    <Calendar id={"birthday"} placeholder={"생년월일"} />
                </div>


                <br/>
                <h5>선택정보</h5>
                <hr/>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">이메일</label>
                    <input type="email" className="form-control" id="emailInput" placeholder="이메일 주소를 입력해주세요"
                           ref={emailRef}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneInput" className="form-label">휴대전화</label>
                    <input type="text" className="form-control" id="phoneInput" placeholder="- 없이 숫자만 입력해주세요"
                           maxLength={11} ref={phoneNumberRef} onChange={phoneChk}/>
                </div>
                <br/>
                <h5>서비스 정책</h5>
                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="agree_all">전체동의</label>
                    <input type="checkbox" className="form-check-input" id="agree_all" ref={agreeAllRef}
                           onChange={toggle_agree_all}/>
                </div>
                <hr/>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="agree_age" ref={agreeAgeRef}/>
                    <label className="form-check-label" htmlFor="agree_age">만 14세 이상입니다. (필수)</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="agree_terms" ref={agreeTermsRef}/>
                    <label className="form-check-label" htmlFor="agree_terms">서비스 이용약관 동의 (필수)</label>
                    <AgreeModal tagId="terms" title={<h2>서비스 이용약관 동의 (필수)</h2>} body={<AgreeTerm />}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="agree_personal"
                           ref={agreePersonalRef}/>
                    <label className="form-check-label" htmlFor="agree_personal">개인정보 수집 및
                        이용 동의 (필수)</label>
                    <AgreeModal tagId="personal" title={<h2>개인정보 수집 및 이용 동의 (필수)</h2>}
                                body={<AgreePersonal />}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="agree_marketing"
                           ref={agreeMarketingRef}/>
                    <label className="form-check-label" htmlFor="agree_marketing">마케팅 수신 동의
                        (선택)</label>
                    <AgreeModal tagId="marketing" title={<h2>마케팅 수신 동의 (선택)</h2>}
                        body={<AgreeMacketing/>}/>
                    </div>

                        <button type="submit" className="btn btn-primary" onClick={submitChk}
                                id={"submitBtn"}>회원가입 완료
                        </button>
                    </form>
                        </>
        );
        }

        export default Join;
