import React, { useEffect, useRef } from "react";
import {useSearchParams} from "react-router-dom";
//https://sir.kr/bbs/board.php?bo_table=g5_skin&wr_id=18719
//https://lpla.tistory.com/144

function SearchCalendar(props:{[key:string]:string|undefined|null}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const from=searchParams.get("start_date")
    const to= searchParams.get("end_date")

    const nodash2dashed=(date:string)=>{
        // 20241101   ---->    2024-11-01
        //return date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8)
        return date.split(".").join("-")
    }

    const startDateRef=useRef<HTMLInputElement>(null);
    const endDateRef=useRef<HTMLInputElement>(null);

    useEffect(()=>{
        /*@ts-ignore*/
        $.datepicker.setDefaults({
            dateFormat: "yy-mm-dd",
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            //changeMonth: true, // month 셀렉트박스 사용
            //changeYear: true, // year 셀렉트박스 사용
            closeText: "닫기",
            currentText: "오늘",
            showButtonPanel: true
        });
        // Today 버튼 코드 추가
        /*@ts-ignore*/
        $.datepicker._gotoToday = function(id) {
            /*@ts-ignore
            $(id).datepicker('setDate', new Date());*/
            /*@ts-ignore
            $(".ui-datepicker").hide().blur();*/
            /*@ts-ignore*/
            $(id).datepicker('setDate', new Date()).datepicker('hide').blur();
        };

        /*@ts-ignore*/
        $(function () {
            /*@ts-ignore*/
            $("#startDate").datepicker({})

            /*@ts-ignore*/
            $("#endDate").datepicker({})
        })
        /*@ts-ignore*/
        $('#startDate').change(function(){
            /*@ts-ignore*/
            $("#endDate").datepicker("option", "minDate", $("#startDate").datepicker("getDate"))
        });
    })

    useEffect(() => {
        if(startDateRef.current) if(from) startDateRef.current.value = nodash2dashed(from)
        if(endDateRef.current) if(to) endDateRef.current.value = nodash2dashed(to)
    }, []);

    return (
        <>
            <input id={"startDate"} className={"datepicker"} placeholder={"📅 시작일"} ref={startDateRef} />
            <input id={"endDate"} className={"datepicker"} placeholder={"📅 종료일"} ref={endDateRef} />
        </>
    );
}

export default SearchCalendar;
