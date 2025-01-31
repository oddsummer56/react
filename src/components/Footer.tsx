import React from "react";
import "../css/footer.css"
import logo from "../img/TicketMoa-logo-footer.png"

function Footer() {
    return (
        <div id={"footer"}>
            <img src={logo} alt="Logo" id={"footerLogo"} />
            <div>
                <div className={"footer-title"} >TU-Tech</div>
                <small>DE-32-Team1</small><br/>
                <small>구성원 : 김태민, 정미은, 함선우, 오지현</small>
            </div>
            <div>
                <div className={"footer-title"} >고객센터</div>
                <small>Github : https://github.com/Team1-TU-tech/final-team1</small><br/>
            </div>
        </div>
    );
}

export default Footer;
