import React from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

function CheckModal({ message }) {
  const navigate = useNavigate();
  const SpaceRecord = (message) => {
    if (message == "회원가입이 완료되었습니다." || message==="임시 비밀번호가 전송되었습니다."
  || message.substr(0,3)==="아이디"){
      navigate("/login");
    } else {
      navigate("/record");
    }
  };
  return (
    <ChallengeModalWrapper>
      <ChallengeBox>
        <div className="text">{message}</div>
        <img src="recordModal.svg" />
        <div className="okay" onClick={() => SpaceRecord(message)}>
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
  overflow: auto;
  /* identical to box height */

  text-align: center;

  color: #272727;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
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

export default CheckModal;
