import React from 'react'
import { useRecoilState } from 'recoil';
import { challengeModalState } from '../atoms/auth';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

function ChallengeModal() {
  const navigate = useNavigate();
  const [newChallengeFlag, setFlag] = useRecoilState(challengeModalState);
  
  const SpaceHome = () => {
    navigate("/");
  };
  return (

    <ChallengeModalWrapper>
        <ChallengeBox>
            <div>새 챌린지를 시작하시겠습니까?</div>
            <button onClick={SpaceHome}>취소</button>
            <button onClick={()=>setFlag(false)}>네!</button>
            <div>(모달 만들고나서 확인해보니 디자인이 안나와서 이렇게생겼어요)</div>
        </ChallengeBox>
    </ChallengeModalWrapper>

  )
}

const ChallengeModalWrapper = styled.div`
    font-family:'Pretendard',sans-serif;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
`

const ChallengeBox = styled.div`
    height: 200px;
    width: 500px;
    background: #ffffff;
`

export default ChallengeModal