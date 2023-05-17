import React from 'react'
import { styled } from 'styled-components'
function RecordGrowthGraph() {
  //needfix: dummy data
  const prevMonthHeight = `${19/31*100}%`
  const curMonthHeight = `${20/30*100}%`
  //dummy data
  return (
    <Graph>
        <div className='prevMonth'>
            <div className='prevMonthbar' style={{height:prevMonthHeight}}/>
            <span className='date'>19일</span>
            <span className='month'>4월</span>
        </div>
        <div className='curMonth'>
            <div className='curMonthbar' style={{height:curMonthHeight}}/>
            <span className='date'>20일</span>
            <span className='month'>5월</span>
        </div>
    </Graph>
  )
}

const Graph = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    span{
        font-size: 12px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .date{
        font-size: 10px;
        bottom: 5px;
    }
    .month{
        font-size: 12px;
        bottom: -25px;
    }
    .prevMonth .date{
        color: #7C8089;
    }
    .curMonth .date{
        color: #ffffff;
    }
    div{
        position: relative;
        margin-top: 25px;
        height: 110px;
        width: 67px;
        border-radius: 2px;
        background: #E1EAF8;
    }
    .prevMonthbar{
        bottom: 0;
        position: absolute;
        background: #FCE184;
    }
    .curMonthbar{
        bottom: 0;
        position: absolute;
        background: #266CF4;
    }`

export default RecordGrowthGraph