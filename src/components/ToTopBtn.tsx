import React from "react";

import "../css/common.css"

function ToTopBtn() {
    
    const toTop = ()=>{
        window.scrollTo(window.scrollX, 0);
    }
    
    document.addEventListener("scroll", ()=>{
        const toTopBtn = document.getElementById("toTopBtn")
        if(toTopBtn){
            if(window.scrollY===0) toTopBtn.style.display="none"
            else toTopBtn.style.display="block"
        }
    });

    return (<div id={"toTopBtn"} className={"btn btn-light"} onClick={toTop}>
            🔝
        </div>
    );
}

export default ToTopBtn;
