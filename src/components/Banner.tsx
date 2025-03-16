import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../css/banner.css";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import { TicketData } from "../scheme/ticket";
import IconToggleButton, { IconToggleButtonProps } from "./IconToggleButton";
import { loadSession } from "../scripts/common";


function BannerEntry(props: {
    className?: string;
    posterImg?: string;
    _link?:string;
    showTitle: string;
    startDate: string;
    endDate: string;
    likeToggle?: Pick<IconToggleButtonProps, 'value' | 'onClick'>;
}) {

    const navigate = useNavigate();

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (
        <>
            <div className={"card "+props.className}>
                <img src={props.posterImg?.toString()} alt={"Poster"} className="card-img-top posterImg bannerImg" onClick={()=>{move(props._link)}} />
                <div className="card-body bannerBody">
                    <h5 className={"showTitle"} onClick={() => {
                        move(props._link)
                    }}>{props.showTitle}</h5>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1 }}>
                            <small className={"showDate"}>{props.startDate+"~"+props.endDate}</small>
                        </div>
                        {props.likeToggle ? <IconToggleButton {...props.likeToggle} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}

function Banner() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1,
        //vertical:true,

        arrows: true, // 화살표 표시 여부
        autoplay: true, // 자동 재생 설정
        autoplaySpeed: 2000, // 자동 재생 속도(ms)
        centerMode: true, // 현재 슬라이드를 가운데에 정렬
        centerPadding: '10px', // 가장자리 슬라이드 사이의 간격
        className: 'center' // Slider 클래스설정
    };

    const isLogin = loadSession('isLogin');

    const [data, setData] = useState<TicketData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData=async ()=> {
        // await fetch(`http://${process.env.REACT_APP_HOST}:7777/banner`, {
        //     method: "GET",
        // })
        //     .then(res => res.json())
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/banner`)
            .then(res => res.data)
            .then(json => {
                //console.log(json)
                setData(json)
                setIsLoading(false)
                /***** banner fetch save ************/
                localStorage.removeItem("bannerData")
                localStorage.setItem("bannerData", JSON.stringify(json))
                /***** banner fetch save ************/
            })
            .catch(err=> {
                console.error("banner\n└", err)
                const json = localStorage.getItem("bannerData")
                if(json!==null){
                   setData(JSON.parse(json))
                   setIsLoading(false)
                }
            });
    }



    useEffect( () => {
        loadData()
    }, []);

    const handleClickLike = async ({id, isLiked}:{id: string; isLiked: boolean}) => {
        try {
            const { data } = await (isLiked ? axios.delete<string>(`${process.env.REACT_APP_API_ENDPOINT}/del_like`,{
                data: {
                    id: id
                }
            }) : axios.post<TicketData>(`${process.env.REACT_APP_API_ENDPOINT}/like`,{
                id: id
            }))

            setData(pre => {
                const itemId = typeof data === 'string'? data : data.id;
                const dataIndex = pre.findIndex(({id})=> id === itemId)
                if(dataIndex === -1) return pre;

                const newData = [...pre];
                newData[dataIndex].is_liked = !isLiked;
                return newData;
            })
        } catch(e) {
            alert('잠시 후 다시 시도해 주세요')
        }
    } 

    return isLoading?
        <div id="bannerLoadingSection" >
            <img src={"/static/media/loading.gif"} alt={"Loading"} />
            <h3>배너 로딩중..</h3>
        </div>
        :(
        <Slider {...settings}>
            {
                (data ?? []).map((d)=>{
                    return (<div id={"entryWrap"} style={{width: "10px"}} key={uuidv4()}>
                        <BannerEntry
                            className={"sliderContainer"}
                            posterImg= {d["poster_url"]}
                            showTitle={d["title"]}
                            startDate={d["start_date"]}
                            endDate={d["end_date"]}
                            _link={d["id"]}
                            likeToggle={isLogin? {
                                value: d.is_liked,
                                onClick: ()=>handleClickLike({id: d.id, isLiked: d.is_liked})
                            }: undefined}
                        />
                    </div>)
                })}
        </Slider>
    );
}

export default Banner;
