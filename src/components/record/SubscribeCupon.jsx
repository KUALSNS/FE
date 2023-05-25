import React, {useRef} from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil';
import { subscribeModalState } from '../../atoms/auth';
import { subscribedState } from '../../atoms/auth';

function SubscribeCupon() {
  const [modalState, setModalState] = useRecoilState(subscribeModalState);
  const [cuponState, setCuponState] = useRecoilState(subscribedState);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (event.target === outerRef.current && !innerRef.current.contains(event.target)) {
        setModalState(false);
    }
  };

  return (
    <SubscribeCuponWrapper hidden={!modalState?true:false} ref={outerRef} onClick={handleOutsideClick}>
        <div ref={innerRef} className='popup'>
            <div className="cuponImg">
                <button className='useCuponBtn' onClick={()=>{setCuponState(true); setModalState(false)}}>30일 체험 쿠폰 사용</button>
            </div>
            <img className="recommend" src='subscribe_modal_recommend.svg'/>
            <div className="guide">
                <h3>이용 안내</h3>
                <p>1. 라이톤 업 서비스 멤버십을 1개월간 0원으로 이용 가능 합니다.</p>
                <p>2. 사용 시작 일 기준, 30일 동안 챌린지 서비스를 무제한 사용 가능 합니다.</p>
                <p>3. 이용 기간 종료 시 멤버십 연장이 되지 않는 경우, 마감기한에 임박한 챌린지 기준으로 라이톤 서비스는 초기화 됩니다.</p>
                <p>4. 서비스 이용 시 멤버십 해지 이후부터 더 이상 쿠폰이 복구되지 않습니다. </p>
                <p>5. 체험하기 쿠폰은 일회용으로, 한 계정당 한 번 제공됩니다.</p>
            </div>
        </div>
    </SubscribeCuponWrapper>
  )
}
const SubscribeCuponWrapper = styled.div`
    font-family: 'Pretendard', sans-serif;
    position: fixed;
    max-height: 100vh;
    overflow-y: auto;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.4);
    z-index: 30;
    text-align: center;
    display: flex;
    justify-content: center;
    .popup{
        width: 576px;
        height: 921px;
        background: #ffffff;
        border-radius: 12px;
        margin-top: 102px;
        z-index: 40;
        animation: slideUp 1s;
    }
    .cuponImg{
        background: url('subscribe_modal.svg');
        height: 516px;
        width: 100%;
    }
    .useCuponBtn{
        margin-top: 406px;
        width: 248px;
        height: 62px;
        left: calc(50% - 248px/2);
        top: 506px;
        background: #404040;
        border-radius: 2px;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        border: 0;
    }
    .useCuponBtn:hover{
        background: #565656;
    }
    .recommend{
        margin-top: 32px;
        margin-bottom: 29px;
    }
    .guide{
        width: 339px;
        text-align: left;
        margin: auto;
    }
    .guide h3{
        font-size: 12px;
        line-height: 25px;
        margin: 0;
        margin-bottom: 9px;
    }
    .guide p{
        color: rgba(0, 0, 0, 0.5);
        font-size: 11px;
        line-height: 24px;
        margin: 0;
    }
    @keyframes slideUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    }
`

export default SubscribeCupon