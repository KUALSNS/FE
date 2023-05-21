import React from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

function ChallengeRecordModal() {
  const navigate = useNavigate();
  const SpaceRecord = () => {
    navigate("/record");
  };
  return (
    <ChallengeModalWrapper>
      <ChallengeBox>
        <div className="text">오늘의 기록을 완료했어요</div>
        <img src="recordModal.svg" />
        <div className="okay" onClick={SpaceRecord}>
          확인
        </div>
      </ChallengeBox>
    </ChallengeModalWrapper>
  );
}

const ChallengeModalWrapper = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;

  color: #272727;
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
`;

const ChallengeBox = styled.div`
  width: 390px;
  height: 256px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    margin-top: 39px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    text-align: center;

    color: #272727;
  }
  img {
    margin-top: 26px;
    margin-bottom: 22px;
    margin-left: 14px;
  }
  .okay {
    width: 276px;
    height: 40px;
    border: 1px solid #266cf4;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */
    cursor: pointer;
    text-align: center;

    color: #266cf4;
  }
`;

export default ChallengeRecordModal;
