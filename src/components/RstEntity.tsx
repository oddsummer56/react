import React from "react";
import {useNavigate} from "react-router-dom";

import {loadSession} from "../scripts/common";

import "../css/rstPage.css";
import IconToggleButton, { IconToggleButtonProps } from "./IconToggleButton";

function RstEntity(props:{
    className?: string;
    posterImg?: string;
    _link?:string;
    showTitle: string;
    showLocation: string;
    category: string;
    showDate: string;
    onSale?:boolean;
    isExclusive?:boolean;
    likeToggle?: Pick<IconToggleButtonProps, 'value' | 'onClick'>
}) {

    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    const closed= (showDate:string) => {
        return showDate.split("~")[1].split(".").join("") < (loadSession("today") as string)
    }

    const topMenu=(cat:string)=>{
        navigate("/search?query=&region=&start_date=&end_date=&category="+encodeURIComponent(cat)+"&currPage=1")
        window.location.reload()
    }

    return (
        <div>
            <div className="card rstSimpleContainer" >
                <img src={props.posterImg?.toString()} alt={"Poster"} className="card-img-top posterImg" onClick={()=>{move(props._link)}} />
                <div className="card-body">
                    <h5 className={"showTitle"} onClick={() => {
                        move(props._link)
                    }}>{props.showTitle}</h5>
                    <small className={"showLocation"}>{props.showLocation}</small><br/>
                    <small className={"showDate"}>{props.showDate}</small><br/>
                    {props.category ? <span className="badge text-bg-teal clickable" onClick={()=>{topMenu(["뮤지컬","연극"].includes(props.category)?"뮤지컬/연극":props.category)}}>{["뮤지컬","연극"].includes(props.category)?"뮤지컬/연극":props.category}</span> : <></>}
                    {props.onSale ? <span className="badge text-bg-primary">판매중</span> :
                        closed(props.showDate as string) ?
                            <span className="badge text-bg-danger">판매종료</span>
                            : <span className="badge text-bg-danger">판매예정</span>
                    }
                    {props.isExclusive ? <span className="badge text-bg-purple">단독판매</span> : <></>}
                    <div>
                        {props.likeToggle ? <IconToggleButton {...props.likeToggle} /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RstEntity;
