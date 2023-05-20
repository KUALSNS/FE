import React, {useState} from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { recordModalState } from '../atoms/auth'
function RecordCalendar() {
  const [showAll, setShowAll] = useState(false)
  const [showGrowth, setShowGrowth] = useRecoilState(recordModalState)
  return (
    <CalendarWrapper>
        <div className='topbar'>
            <h2>2023년 5월</h2><img className='dropdown' src='calendar_title_dropdown.svg'/>
            <button className='show' onClick={()=>setShowAll(!showAll)}><img src='calendar_showBtnIcon.svg'/>{showAll?'달력 접기':'달력 펼치기'}</button>
            <button className='grow' onClick={()=>setShowGrowth(!showGrowth)}><img src='calendar_growBtnIcon.svg'/>성장</button>
        </div>
        <div className={showAll?'calendar monthly':'calendar weekly'}>달력자리</div>

    </CalendarWrapper>
  )
}

const CalendarWrapper = styled.div`
  width: 100%;
  .topbar{
    position: relative;
    padding-top: 48px;
    padding-bottom: 16px;
  }
  .topbar h2{
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 18px;
    width: 94px;
    height: 23px;
    margin-right: 2px;
    display: inline-block;
  }
  .topbar .dropdown{
    margin-right: 24px;
  }
  .topbar button{
    width: 123px;
    height: 40px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 2px;
  } 
  .topbar button img{
    margin-right: 8px;
  }
  .topbar .show{
    background: #ffffff;
    border: 1px solid #E2E4E7;
  }
  .topbar .grow{
    position: absolute;
    right: 0;
    background: #DEE9FD;
    border: 1px solid #BCD6FF;
  }

  .monthly{
    height: 826px;
    transition: height 0.5s ease-in-out;
    background-color: grey;
  }
  
  .weekly{
    height: 214px;
    transition: height 0.3s ease-in-out;
    background-color: grey;
  }
`

export default RecordCalendar