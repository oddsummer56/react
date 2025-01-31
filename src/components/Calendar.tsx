import React, {MutableRefObject, useRef} from "react";
import {useInput} from "../scripts/common";
//https://sir.kr/bbs/board.php?bo_table=g5_skin&wr_id=18719
//https://lpla.tistory.com/144

function Calendar(props:{[key:string]:string|undefined|null}) {

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
        changeMonth: true, // month 셀렉트박스 사용
        changeYear: true, // year 셀렉트박스 사용
        closeText: "닫기",
        currentText: "오늘",
        showButtonPanel: true,
        yearRange: 'c-50:c+0'
    });
    // Today 버튼 코드 추가
    /*@ts-ignore*/
    $.datepicker._gotoToday = function(id) {
        /*@ts-ignore*/
        $(id).datepicker('setDate', new Date()).datepicker('hide').blur();
    };

    /*@ts-ignore*/
    $(function () {
        /*@ts-ignore*/
        $(".datepicker").datepicker();
    });

    return (
        <>
            <input className={"datepicker"} id={props.id?props.id:""} placeholder={"📅 "+(props.placeholder?props.placeholder?.toString():"")} />
        </>
    );
}

export default Calendar;