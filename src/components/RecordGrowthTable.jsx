import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components';
function RecordGrowthTable({props}) {
  const weekState= props;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [prevWeek, setPrevWeek] = useState([])
  const [curWeek, setCurWeek] = useState([])
  const [checkPrevWeek, setCheckPrevWeek] = useState([]);
  const [checkCurWeek, setCheckCurWeek] = useState([]);
  const [curDataLoaded, setCurDataLoaded] = useState(false);
  const [prevDataLoaded, setPrevDataLoaded] = useState(false);

  useEffect(() => {
    findWeeklyDate();
    formatCheckDate();
  }, [])
  

  useEffect(()=>{
    setPrevDataLoaded(true);
  }, [checkPrevWeek])

  useEffect(()=>{
    setCurDataLoaded(true);
  }, [checkCurWeek])

  const findWeeklyDate = ()=>{
    const today = new Date();
    const day = today.getDay();
    const date = today.getDate();
    const sunday = new Date(today);
    sunday.setDate(date - day);
  
    const prevWeek = [];
    const curWeek = []; 
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      curWeek.push(date.getDate());
      prevWeek.push(date.getDate()-7);
    }
    setPrevWeek(prevWeek);
    setCurWeek(curWeek);
  }

  const formatCheckDate = ()=>{
    const parsedPrevWeek = weekState.lastWeek.map(dateString => new Date(dateString).getDate());
    setCheckPrevWeek(parsedPrevWeek);
    const parsedCurWeek = weekState.thisWeek.map(dateString => new Date(dateString).getDate());
    setCheckCurWeek(parsedCurWeek);
  }
  

  return (
    <Table>
        <div className='week'>
            {week.map(item=>(
                <div>{item}</div>
            ))}
        </div>
        <div className='prevWeek checkarea'>
            <span>지난주</span>
            {prevDataLoaded&&prevWeek.map((check, idx) =>(
                <div key={idx} className={checkPrevWeek.indexOf(check)>-1?"checkbox":"emptybox"}></div>
            ))}
        </div>
        <div className='curWeek checkarea'>
            <span>이번주</span>     
            {curDataLoaded&&curWeek.map((check, idx)=>(
                <div key={idx} className={checkCurWeek.indexOf(check)>-1?"checkbox":"emptybox"}></div>
            ))}
        </div>
    </Table>
  )
}

const Table = styled.div`
    padding: 22px 18px;
    .week{
        display: flex;
        margin-left: 62px;
        gap: 14px;
    }
    .week div{
        flex-basis: 32px;
        font-weight: 600;
        font-size: 12px;
        color: #7C8089;
    }
    .checkarea{
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 20px;
    }
    .checkarea span{
        color: #7C8089;
        font-size: 12px;
        flex-basis: 34px;
    }
    .checkarea div{
        width: 32px;
        height: 32px;
        background: #E1EAF8;
        border-radius: 2px;
    }
    .prevWeek .checkbox{
        background: url('record_modal_yellowcheck.svg')
    }
    .curWeek .checkbox{
        background: url('record_modal_bluecheck.svg')
    }
    
`

export default RecordGrowthTable