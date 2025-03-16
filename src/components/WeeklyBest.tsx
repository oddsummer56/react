import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";

import MainEntry from "./MainEntry"
import axios from "axios";
import { TicketData } from "../scheme/ticket";
import { loadSession } from "../scripts/common";

function WeeklyBest() {
  const isLogin = loadSession('isLogin');
  const [data, setData] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    // await fetch(`http://${process.env.REACT_APP_HOST}:7777/top_show`)
    //     .then(res => res.json())
      await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/popular`)
          .then(resp=>resp.data)
        .then(json => {
          //const json=data["top_tickets"]
          setData(json)
          setIsLoading(false);
          /***** banner fetch save ************/
          localStorage.removeItem("WeeklyBest")
          localStorage.setItem("WeeklyBest", JSON.stringify(json))
          /***** banner fetch save ************/
        })
        .catch(err=> {
          console.error("WeeklyBest\n└", err)
          const json = localStorage.getItem("WeeklyBest")
          if(json!==null){
            setData(JSON.parse(json))
            setIsLoading(false)
          }
        });
  }

//   const data1=[
//         {
//           "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
//           "showTitle": "뮤지컬 지킬앤하이드 (Jekyll ＆ Hyde) - 20주년",
//           "showLocation": "블루스퀘어 신한카드홀",
//           "showDate": "2024.11.29 ~2025.05.18",
//           "category": "스릴러",
//           "onSale": true,
//           "isExclusive": true,
//           "id":1
//         },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013619_p.gif",
//       "showTitle": "뮤지컬 〈스윙 데이즈_암호명 A〉",
//       "showLocation": "충무아트센터 대극장",
//       "showDate": "2024.11.19 ~2025.02.09",
//       "category": "스릴러",
//       "onSale": true,
//       "isExclusive": true,
//       "id":2
//   },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24011935_p.gif",
//       "showTitle": "뮤지컬 〈광화문연가〉",
//       "showLocation": "디큐브 링크아트센터",
//       "showDate": "2024.10.23 ~2025.01.05",
//       "category": "로맨틱",
//       "onSale": true,
//       "isExclusive": true,
//       "id":3
//   },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
//       "showTitle": "뮤지컬 〈이프덴〉",
//       "showLocation": "홍익대 대학로 아트센터 대극장",
//       "showDate": "2024.12.03 ~2025.03.02",
//       "category": "로맨틱",
//       "onSale": true,
//       "isExclusive": true,
//       "id":4
//   },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/P0/P0004107_p.gif",
//       "showTitle": "뮤지컬 〈명성황후〉 30주년 기념 공연",
//       "showLocation": "세종문화회관 대극장(자세히)",
//       "showDate": "2025.01.21 ~2025.03.30",
//       "category": "가족과",
//       "onSale": true,
//       "isExclusive": true,
//       "id":5
//   }, {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24016412_p.gif",
//         "showTitle": "뮤지컬 〈고스트 베이커리〉",
//         "showLocation": "두산아트센터 연강홀",
//         "showDate": "2024.12.19 ~2025.02.23",
//         "category": "가족과",
//         "onSale": true,
//         "isExclusive": true,
//         "id":6
//   },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013619_p.gif",
//       "showTitle": "뮤지컬 〈스윙 데이즈_암호명 A〉",
//       "showLocation": "충무아트센터 대극장",
//       "showDate": "2024.11.19 ~2025.02.09",
//       "category": "스릴러",
//       "onSale": true,
//       "isExclusive": true,
//       "id":2
//   },
//   {
//     "posterImg": "https://ticketimage.interpark.com/Play/image/large/24/24013619_p.gif",
//       "showTitle": "뮤지컬 〈스윙 데이즈_암호명 A〉",
//       "showLocation": "충무아트센터 대극장",
//       "showDate": "2024.11.19 ~2025.02.09",
//       "category": "스릴러",
//       "onSale": true,
//       "isExclusive": true,
//       "id":2
//   }
// ]

  useEffect(() => {
    getData();
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
            const dataIndex = pre.findIndex(({id})=> id===itemId)
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
      <div id="LoadingSection" >
        <img src={"/static/media/loading.gif"} alt={"Loading"} />
        <h3>주간 베스트 로딩중..</h3>
      </div>
      :(<div id={"weeklyBest"} className={"mainSection"} >
    <h3 style={{marginBottom:"25px"}}>주간 베스트</h3>
    <div id={"weeklyBestContainer"} className={"mainEntryContainer"}>
      {
        data.map((d, j) => {
          return (<MainEntry
              className={"mainEntry mx-auto my-0"}
              posterImg= {d["poster_url"]}
              showTitle={d["title"]}
              showLocation={d["location"]}
              showDate={`${d["start_date"]}~${d["end_date"]}`}
              onSale={false}
              isExclusive={false}
              _link={d["id"]}
              likeToggle={isLogin ?{
                value: d.is_liked,
                onClick: (e)=>{handleClickLike({id: d.id, isLiked: d.is_liked});
                }
            }: undefined}
              key={uuidv4()}
          />)
        })
      }
    </div>
      </div>)
}

export default WeeklyBest;
