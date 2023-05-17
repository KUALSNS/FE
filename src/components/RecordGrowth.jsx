import React from 'react'
import { styled } from 'styled-components';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { subscribedState, recordModalState, subscribeModalState } from '../atoms/auth'
import RecordGrowthGraph from './RecordGrowthGraph';
import RecordGrowthTable from './RecordGrowthTable';

function RecordGrowth() {
    const [showState, setShowState] = useRecoilState(recordModalState);
    const subscribeState = useSetRecoilState(subscribeModalState)
    const subscriber = useRecoilValue(subscribedState)
    //needfix: dummy data
    const monthlyStatData = [
        {
          tag: <span><span className='blue'>2</span>/30일</span>,
          text: '참여일'
        },
        {
          tag: <span className='blue'>1</span>,
          text: '진행 중 챌린지'
        },
        {
          tag: <span>0일</span>,
          text: '미달성일'
        }
    ];
    const weeklyStatData = [
        {
          tag: <span><span className='blue'>2</span>/7일</span>,
          text: '참여일'
        },
        {
          tag: <span className='blue'>1</span>,
          text: '진행 중 챌린지'
        },
        {
          tag: <span>0일</span>,
          text: '미달성일'
        }
    ];
      //dummy data
  return (
    <RecordGrowthWrapper showState={showState}>
        <div className='topbar'>
            <div className='xbtn' onClick={()=>setShowState(false)}><img src="record_modal_xbtn.svg"></img></div>
            <div className='logoArea'><img src="record_modal_logo.svg"></img>성장 분석</div>
        </div>

        <div className='statistics'>
            <h2>라이언님,<br/>이번 달은 20일 챌린지를 완료했어요</h2>
            <p>지난 달보다 <span className='blue'>1일 더 달성</span>했어요!</p>
            <div className='visualized'>
                <RecordGrowthGraph/>
            </div>
            <div className='explain'>
            {monthlyStatData.map((item, index) => (
                <div className='explainitem' key={index}>
                    <div className='tag'>{item.tag}</div>
                    <div className='text'>{item.text}</div>
                </div>
            ))}
            </div>
        </div>

        <div className='weeklyStatistics'>
            {subscriber?
            <>
                <h2>이번주는 2일 챌린지를 완료했어요.</h2>
                <p>지난 주보다 <span className='blue'>1일 더 달성</span>했어요!</p>
                <div className='visualized'>
                    <RecordGrowthTable/>
                </div>
                <div className='explain'>

                {weeklyStatData.map((item, index) => (
                    <div className='explainitem' key={index}>
                        <div className='tag'>{item.tag}</div>
                        <div className='text'>{item.text}</div>
                    </div>
                ))}
                </div>
            </>
            :
            <>
            <h2>이번 주 분석은 열람이 필요해요</h2>
                <div className='subscribeArea'>
                <div className='cupon'>
                    <h2>라이톤 업 구독자만 읽을 수 있어요 😢</h2>
                    <p>멤버십에 가입하려면 하단 버튼을 클릭해주세요</p>
                    <button onClick={()=>subscribeState(true)}>체험하기 쿠폰 사용</button>
                </div>
            </div>
            </>    
            }
        </div>
    </RecordGrowthWrapper>
  )
}
const RecordGrowthWrapper = styled.div`
    font-family: 'Pretendard', sans-serif;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: #ffffff;
    width: 470px;
    z-index: 20;
    box-shadow: -10px 4px 16px -12px rgba(39, 39, 39, 0.1);
    padding: 58px 40px;
    transform: ${(props) => props.showState?"translateX(0%);":"translateX(100%);"};
    transition: transform 0.5s ease-in-out;
    .topbar{
        margin-top: 18px;
        margin-bottom: 68px;
        display: flex;
        justify-content: space-between;
    }
    .topbar .xbtn{
        cursor: pointer;
    }
    .statistics h2{
        font-family: 'Happiness-Sans-Bold', sans-serif;
        font-size: 22px;
        line-height: 32px;
        margin-bottom: 16px;
    }
    .statistics p{
        font-size: 16px;
        margin-bottom: 24px;
    }
    .blue{
        color: var(--challenging-blue);
    }
    .visualized{
        height: 176px;
        background: #F5F9FF;
        margin-bottom: 9px;
    }
    .explain{
        display: flex;
        gap: 9px;
        height: 70px;
    }
    .explainitem{
        flex: 1;
        text-align: center;
        background: #F5F9FF;
        border: 8px;
        padding: 8px auto;
    }
    .explainitem .tag{
        color: #7C8089;
        font-size: 10px;
        margin: 8px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 20px;
        background: #FFFFFF;
        border: 1px solid #BCD6FF;
        border-radius: 32px;
    }
    .explainitem .text{
        font-size: 14px;
    }
    .weeklyStatistics h2{
        margin-top: 60px;
        font-family: 'Happiness-Sans-Bold', sans-serif;
        font-size: 22px;
        line-height: 32px;
        margin-bottom: 24px;
    }
    .cupon{
        height: 189px;
        background: url("record_modal_cupon_background.svg") no-repeat;
        border: 1px solid #E2E4E7;
        border-radius: 8px;
        text-align: center;
    }
    .cupon h2{
        margin-top: 41px;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 700;
    } 

    .cupon p{
        font-size: 12px;
        line-height: 15px
        color: #7C8089;
        margin-bottom: 15px;
    }

    .cupon button{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        margin: auto;
        width: 142px;
        height: 40px;
        background: #266CF4;
        color: #ffffff;
        border: 0;
        font-size: 14px;
        border-radius: 2px;
    }
`

export default RecordGrowth