import React from "react";
import "../css/rstPage.css";
import {useNavigate} from "react-router-dom";
import IconToggleButton, { IconToggleButtonProps } from "./IconToggleButton";

type Props = {
    className?: string;
    posterImg?: string;
    _link?:string;
    showTitle: string;
    showLocation: string;
    showDate: string;
    onSale?:boolean;
    isExclusive?:boolean;
    likeToggle?: Pick<IconToggleButtonProps, 'value' | 'onClick'>
}

function MainEntry(props : Props) {

    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (
        <>
            <div className={"card "+props.className}>
                <img src={props.posterImg?.toString()} alt={"Poster"} className="card-img-top posterImg" onClick={()=>{move(props._link)}} />
                <div className="card-body">
                    <h5 className={"showTitle"} onClick={() => {
                        move(props._link)
                    }}>{props.showTitle}</h5>
                    <small className={"showLocation"}>{props.showLocation}</small><br/>
                    <small className={"showDate"}>{props.showDate}</small><br/>
                    {props.onSale ? <span className="badge text-bg-primary">판매중</span> : <></>
                    }
                    {props.isExclusive ? <span className="badge text-bg-purple">단독판매</span> : <></>}
                    {props.likeToggle ? <IconToggleButton {...props.likeToggle} /> : <></>}
            </div>
            </div>
        </>
    );
}

export default MainEntry;
