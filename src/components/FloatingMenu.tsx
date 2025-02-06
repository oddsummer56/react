import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

const Entry=(props: { [key: string]: string | { [key: string]: string | undefined } | undefined })=>{

    const data = props.data as { [key: string]: string | undefined }

    const move =(id:string)=>{
        window.location.href=`/detail/${id}`
    }

    return (<div className={"floating-entry"}>
        <img
            src={data["poster_url"]}
            alt={"포스터:::::::: "+data["title"]}
            title={`제목 : ${data["title"]}\n공연기간 : ${data["start_date"]} ~ ${data["end_date"]}\n장소 : ${data["location"]}`}
            onClick={()=>{move(data["id"] as string)}}
        />
        <small
            title={`제목 : ${data["title"]}\n공연기간 : ${data["start_date"]} ~ ${data["end_date"]}\n장소 : ${data["location"]}`}
           onClick={()=>{move(data["id"] as string)}}
        > {data["title"]}</small>
    </div>);
}

function FloatingMenu(props: { [key: string]: string | undefined }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        // await fetch(`http://${process.env.REACT_APP_HOST}:7777/recommendation/`+props.oid,{
        //     method:"GET"
        // })
        //     .then(res => res.json())
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/recommendation/`+props.oid)
            .then(resp=>resp.data)
            .then(json => {
                //console.log(json)
                setData(json);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }

    document.addEventListener("scroll", ()=>{
        const floating = document.getElementById("floating-menu")
        if(floating){
            let position = Math.max(30,165-document.documentElement.scrollTop)
            floating.style.top=`${position}px`
        }
    });

    useEffect(() => {
        loadData();
    },[])

    return (
        <div id={"floating-menu"}>
            <h5>빠른 추천</h5>
            {isLoading?
                <>
                    <img src={"/static/media/loading.gif"} alt="loading" id={"loading"}
                         style={{zIndex: 9999, width: "97%"}}/>
                    <h6>유사한 공연을 찾는중..</h6>
                </>
                : data.map(data => < Entry data={data} key={uuidv4()}/>)}
        </div>
    );
}

export default FloatingMenu;
