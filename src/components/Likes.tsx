import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "../css/visited.css";
import axios from "axios";
import Loading from "./Loading";
import { ReactComponent as HeartFillIcon } from "../img/heart_fill.svg";
import LoadingSpinner from "./LoadingSpinner";

type LikedTicketData = {
    "id": string,
    "open_date": string,
    "end_date": string,
    "poster_url": string,
    "location": string,
    "title": string
}

function Likes() {

    const navigate = useNavigate();
    
    const [data, setData] = useState<LikedTicketData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadData=async ()=> {
        await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_like`)
            .then(res => res.data)
            .then(json => {
                //console.log(json)
                const listdata = [...(json as LikedTicketData[])]
                listdata.reverse();
                setData(listdata)
                
                setIsLoading(false)
            })
            .catch(err=> {
                console.error("banner\n", err)
                const json = localStorage.getItem("bannerData")
                if(json!==null){
                   setData(JSON.parse(json))
                   setIsLoading(false)
                }
            });
    }

    const [isDeleteLikeLoading, setIsDeleteLikeLoading] = useState(false);
    const deleteLike = async (id: string)=> {
        setIsDeleteLikeLoading(true);
        try {
            const { data: deletedId } = await axios.delete<string>(`${process.env.REACT_APP_API_ENDPOINT}/del_like`,{
                data: {
                    id: id
                }
            })
            setData(pre=>pre.filter(({id})=>id !== deletedId))
        } catch (e) {
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요')
        } finally {
            setIsDeleteLikeLoading(false);
        }
    }



    useEffect( () => {
        loadData()
    }, []);

    const move= (i: string | number | boolean | undefined)=>{
        navigate("/detail/"+i?.toString());
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>찜 목록</h2>
            {isLoading ? <Loading /> : 
                data.length > 0 ? 
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap',
                    rowGap: 12,
                    columnGap: 12,
                    position: 'relative',
                }}>
                    {data.map(i => {
                        return (
                            <div
                                key={i.id}
                                style={{
                                    width: 'calc((100% - 12px) / 2)',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    overflow:'hidden',
                                    border: 'solid gray 1px',
                                    borderRadius: 12,
                                    padding: 4
                                }} 
                                onClick={() => move(i["id"])}
                            >
                                <img src={i.poster_url} alt={"title poster img"} id={"visitedPoster"}  alt={`${i.title} 포스터`}/>
                                <div style={{ overflow:'hidden', flexGrow:1, flexShrink:1, textAlign:'start', borderLeft: '#BDBDBD 5px solid', marginLeft: 13, paddingLeft: 8 }}>
                                    <div style={{
                                        overflow:'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace:'nowrap',

                                        width: 'calc(100%)',
                                    
                                        fontSize: 27
                                    }}>{i.title}</div>
                                    <div style={{ wordBreak:'break-all' }}>{i.location}</div>
                                    <div style={{ wordBreak:'break-all' }} >{`${formatDate(new Date(i.open_date))}~${formatDate(new Date(i.end_date))}`}</div>
                                </div>
                                <div>
                                    <button 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            e.stopPropagation()
                                            deleteLike(i.id)
                                        }} 
                                        style={{
                                            width: 'fit-content',
                                            padding: 4,
                                            outline:'none',
                                            border:'none',
                                            backgroundColor:'transparent'
                                        }}
                                    >
                                        <HeartFillIcon color='red'/>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    {
                    isDeleteLikeLoading ? 
                        <div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.74)', display:'flex', justifyContent:'center', alignItems:'center' }}>
                            <LoadingSpinner />
                        </div>
                        :null
                    }
                </div>
                : <div style={{fontSize: 27, textAlign:'center'}} >
                    찜 목록이 없습니다.
                </div>
            }
        </div>
    );
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul'
    }).format(date).replace(/\.\s/g, '.').replace(/\.$/, '');
}

export default Likes;
