import React from "react";
import "../css/rstPage.css";
import RstEntity from "./RstEntity";
import {useSearchParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import { TicketDataWithStatus } from "../scheme/ticket";
import { loadSession } from "../scripts/common";

function SearchRstMain(props:{ rstNum: number; data: TicketDataWithStatus[]; onClickLike?: (params: {id: string; isLiked: boolean}) => void }) {
    const isLogin = loadSession('isLogin');

    const [searchParams] = useSearchParams();

    const currPage=searchParams.get("currPage")
    const currPageNum=currPage?Number.parseInt(currPage):1


    const data = (props.data && typeof props.data==="object") ? props.data:[]
    const partitionData = data.slice(((currPageNum-1)*50),currPageNum*50)

    return (
        <div id={"rstMain"}>
            <div id={"rstRoot"}>
                {
                    partitionData.map((d,i)=>{
                        return <RstEntity
                            posterImg= {d["poster_url"]}
                            showTitle={d["title"]}
                            showLocation={d["location"]}
                            showDate={d["start_date"]+"~"+d["end_date"]}
                            onSale={d["onSale"]}
                            isExclusive={d["isExclusive"]}
                            _link={d["id"]}
                            category={d["category"]}
                            key={uuidv4()}
                            likeToggle={isLogin && props.onClickLike ?{
                                value: d.is_liked,
                                onClick: ()=>{ props.onClickLike?.({id: d.id, isLiked: d.is_liked});
                                }
                            }: undefined}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default SearchRstMain;
