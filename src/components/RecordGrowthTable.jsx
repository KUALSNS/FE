import React from 'react'
import { styled } from 'styled-components';
function RecordGrowthTable() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  //needfix: dummy data
  const prevWeekCheckData = [false, false, true, false, false, false, false ]
  const curWeekCheckData = [false, true, false, false, true, false, false]
  //dummy data

  return (
    <Table>
        <div className='week'>
            {week.map(item=>(
                <div>{item}</div>
            ))}
        </div>
        <div className='prevWeek checkarea'>
            <span>지난주</span>
            {prevWeekCheckData.map((check, idx) =>(
                <div key={idx} className={check?"checkbox":"emptybox"}></div>
            ))}
        </div>
        <div className='curWeek checkarea'>
            <span>이번주</span>     
            {curWeekCheckData.map((check, idx)=>(
                <div key={idx} className={check?"checkbox":"emptybox"}></div>
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