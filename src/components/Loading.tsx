import React from "react";
import "../css/loading.css"

function Loading() {

    return (
        <div id={"loadingPage"}>
            <img src={"/static/media/loading.gif"} alt={"loadingImg"} />
        </div>
    );
}

export default Loading;



