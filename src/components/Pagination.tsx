import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import "../css/common.css";
import {v4 as uuidv4} from "uuid";


function JumpTo(props: { [key: string]: string | number | undefined }): JSX.Element {

    //const [searchParams, setSearchParams] = useSearchParams();

    //console.log("searchParams::: " + searchParams)
    //console.log("searchParams.queryText::: " + searchParams.get("query"))
    //console.log("searchParams.page::: " + searchParams.get("currPage"))

    let calc = (n: number) => {
        return 0
    }
    const currPage = props.currPage ? props.currPage : 1
    const currNum = Number.parseInt(currPage.toString())
    const totalPage = props.totalPage ? props.totalPage : 1
    // const queryText = props.query
    // const location = props.location
    // const startDate = props.startDate
    // const endDate = props.endDate
    // const category = props.category

    //const linkTo="/search?keyword=" + encodeURIComponent(queryText?queryText:"") +"&region="+location+"&start_date="+startDate+"&end_date="+endDate + "&category="+category + "&currPage="
    const linkTo = props.linkTo;

    switch (props.to) {
        case "first":
            return (<li className="page-item">
                <a className="page-link" href={linkTo + "1"} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>);

        case "last":
            return (<li className="page-item">
                <a className="page-link" href={linkTo + totalPage.toString()} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>);

        case "prev":
            calc = (n: number) => {
                return n - (n % 10)
            } // - 9

            const prevIdx = calc(Number.parseInt(currNum.toString()))

            if (currNum > 10) {
                return (
                    <li className="page-item"><a className="page-link" id={"nextBtn"}
                                                 href={linkTo + prevIdx.toString()}>Prev</a></li>
                );
            } else {
                return <></>
            }

        case "next":
            calc = (n: number) => {
                return 11 - (n % 10) + n
            }

            if (totalPage) {
                const nextIdx = currNum % 10 > 0 ? calc(currNum) : currNum + 1

                if (nextIdx <= totalPage) {
                    return (
                        <li className="page-item">
                            <a className="page-link" id={"nextBtn"} href={linkTo + nextIdx.toString()}>Next</a>
                        </li>
                    );
                } else {
                    return <></>
                }
            } else {
                return <></>
            }

        default:
            return <></>
    }
//
// function GoFirst():JSX.Element {
//
//     const [searchParams, setSearchParams] = useSearchParams();
//
//     console.log("searchParams::: "+searchParams)
//     console.log("searchParams.queryText::: "+searchParams.get("query"))
//     console.log("searchParams.page::: "+searchParams.get("currPage"))
//
//     return (<li className="page-item">
//         {/*<a className="page-link" href={"./"+params.queryText+"/1"} aria-label="Previous">*/}
//         <a className="page-link" href={"./1"} aria-label="Previous">
//             <span aria-hidden="true">&laquo;</span>
//         </a>
//     </li>);
// }
//
// function GoLast(props: { [key: string]: string | number | undefined }):JSX.Element {
//     return (<li className="page-item">
//         <a className="page-link" href={"./"+props.totalPage?.toString()} aria-label="Next">
//             <span aria-hidden="true">&raquo;</span>
//         </a>
//     </li>);
// }
//
// function GoNext(props: { [key: string]: string | number | undefined }):JSX.Element {
//
//     //const params = useParams()
//     //const [searchParams, setSearchParams] = useSearchParams();
//
//     /*@ts-ignore*/
//     //const nextBtn:HTMLAnchorElement|null =document.getElementById("nextBtn")
//     const calc=(n:number)=>{return 11-(n%10)+n}
//     //if(params.page && props.totalPage) {
//     //const currPage=searchParams.get("currPage")
//
//     if(props.currPage && props.totalPage) {
//         const currPage= Number.parseInt(props.currPage.toString())
//         const nextIdx= currPage%10>0?calc(currPage):currPage+1
//
//         if(nextIdx<=props.totalPage) {
//             return (
//                 // <li className="page-item"><a className="page-link" id={"nextBtn"} href={"./" + nextIdx.toString()} >Next</a></li>
//                 <li className="page-item"><a className="page-link" id={"nextBtn"} href={"/search?query="+encodeURIComponent(queryText?queryText:"")+"&currPage="+nextIdx.toString()} >Next</a></li>
//             );
//         } else {return <></>}
//     } else {return <></>}
//
// }
//
// function GoPrev(props: { [key: string]: string | number | undefined }):JSX.Element {
//
//     /*@ts-ignore*/
//     //const nextBtn:HTMLAnchorElement|null =document.getElementById("nextBtn")
//     const calc=(n:number)=>{return n-(n%10)-9}
//     const currPage = props.currPage
//
//     if(currPage) {
//         const prevIdx=calc(Number.parseInt(currPage.toString()))
//
//         if(Number.parseInt(currPage.toString())>10) {
//
//             return (
//                 <li className="page-item"><a className="page-link" id={"nextBtn"} href={"./" + prevIdx.toString()}  >Prev</a></li>
//             );
//         } else {return <></>}
//     } else {return <></>}
//
//     /*@ts-ignore*/
//     // const prevBtn:HTMLAnchorElement|null =document.getElementById("prevBtn")
//     // const prevIdx=Number.parseInt(currPage?.toString())-1
//     // if(prevBtn){
//     //     if(prevIdx>1) prevBtn.href="./"+prevIdx.toString()
//     //     else prevBtn.classList.add("disabled")
//     // }
// }
}


function Pagination(props: { [key: string]: string | number | null }) {

    //const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();

    const currPage = searchParams.get("currPage")
    const queryText = searchParams.get("keyword")
    const location = searchParams.get("region")
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const category = searchParams.get("category")
    const includes = searchParams.get("notSale")

    const totalPage = props.totalPage
    const linkTo = window.location.pathname.includes("search") ?
        "/search?keyword=" + encodeURIComponent(queryText ? queryText : "") + "&region=" + location + "&start_date=" + startDate + "&end_date=" + endDate + "&category=" + category + "&notSale=" + includes + "&currPage="
        : `/exclusive/all?site_id=${searchParams.get("site_id")}&currPage=`

    const preset = []
    if (totalPage && currPage) {
        const currPageNum = Number.parseInt(currPage)
        const calc = (n: number) => {
            return n - (n % 10) + 1
        }
        const initPage = currPageNum % 10 > 0 ? calc(currPageNum) : currPageNum - 9

        for (let i = initPage; i <= Math.min(Number.parseFloat(totalPage.toString()), initPage + 9); i++) {
            preset.push(i)
        }
    }

    useEffect(() => {
        if (currPage && totalPage) {
            const selected = document.getElementById("page-link-" + currPage.toString())
            if (selected) selected.classList.add("selected")
            //console.log(selected)
        }
    }, [])


    return (
        <div id={"pagination"}>
            <nav aria-label="Page navigation">
                <ul className="pagination" id={"naviRoot"}>
                    {/*{totalPage!==null&&totalPage>10?<JumpTo to="first" totalPage={totalPage} query={queryText?queryText:""} currPage={currPage?currPage:1} location={location?location:""} startDate={startDate?startDate:""} endDate={endDate?endDate:""} category={category?category:""} />:<></> }*/}
                    {/*{totalPage!==null&&totalPage>10?<JumpTo to="prev" totalPage={totalPage} query={queryText?queryText:""} currPage={currPage?currPage:1} location={location?location:""} startDate={startDate?startDate:""} endDate={endDate?endDate:""} category={category?category:""} />:<></> }*/}
                    {totalPage !== null && totalPage > 10 ?
                        <JumpTo to="first" totalPage={totalPage} currPage={currPage ? currPage : 1}
                                linkTo={linkTo}/> : <></>}
                    {totalPage !== null && totalPage > 10 ?
                        <JumpTo to="prev" totalPage={totalPage} currPage={currPage ? currPage : 1}
                                linkTo={linkTo}/> : <></>}
                    {
                        preset.map(d =>
                            <li className="page-item" key={uuidv4()}>
                                <a className="page-link"
                                   id={"page-link-" + d}
                                   href={linkTo + d.toString()}>
                                    {d} </a>
                            </li>
                        )
                    }
                    {/*{totalPage!==null&&totalPage>10?<JumpTo to="next" totalPage={totalPage} query={queryText?queryText:""} currPage={currPage?currPage:1} location={location?location:""} startDate={startDate?startDate:""} endDate={endDate?endDate:""} category={category?category:""} />:<></> }*/}
                    {/*{totalPage!==null&&totalPage>10?<JumpTo to="last" totalPage={totalPage} query={queryText?queryText:""} currPage={currPage?currPage:1} location={location?location:""} startDate={startDate?startDate:""} endDate={endDate?endDate:""} category={category?category:""} />:<></> }*/}
                    {totalPage !== null && totalPage > 10 ?
                        <JumpTo to="next" totalPage={totalPage} currPage={currPage ? currPage : 1}
                                linkTo={linkTo}/> : <></>}
                    {totalPage !== null && totalPage > 10 ?
                        <JumpTo to="last" totalPage={totalPage} currPage={currPage ? currPage : 1}
                                linkTo={linkTo}/> : <></>}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;

