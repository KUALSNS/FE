import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  startChallengeModalState,
  selectChallengeState,
  ChallengeWriteState,
  loadingState,
  TitleState,
} from "../../atoms/auth";

const StartChallengeModal = () => {
  const navigate = useNavigate();
  const [selectChallenge, setSelectChallenge] =
    useRecoilState(selectChallengeState);
  const [writeChallenge, setWriteChallenge] =
    useRecoilState(ChallengeWriteState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [startChallenge, setStartChallenge] = useRecoilState(
    startChallengeModalState
  );
  const [title, setTitle] = useRecoilState(TitleState);

  function Retoken() {
    // 토큰 재발급 API 호출
    return getAccessToken()
      .then((res) => {
        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        // 재발급 받은 리프레시 토큰도 필요한 경우 저장 또는 업데이트

        return Promise.resolve(newAccessToken);
      })
      .catch((error) => {
        console.error("토큰 재발급 에러:", error);
        return Promise.reject(error);
      });
  }

  function getChallengePageWithTokenRefresh(title) {
    return getChallengePage(title)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("challengeName", title);
        setWriteChallenge(res.data.data);

        setSelectChallenge(
          "[" +
            res.data.data.templateData.challengeCategory +
            "]" +
            " " +
            res.data.data.templateData.challengeName
        );
        setLoading(false);
        navigate("/challenge");
        setStartChallenge(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const backToMain = () => {
    setStartChallenge(false);
  };

  const spaceChallenge = () => {
    setLoading(true);
    localStorage.removeItem("fixChallenge");
    getChallengePageWithTokenRefresh(title);
  };

  return (
    <ChallengeModalWrapper>
      <ChallengeBox>
        <div className="text">지금 챌린지를 시작해 볼까요?</div>
        <img src="start_challenge.svg" />
        <div className="btn-1">
          <div className="no" onClick={backToMain}>
            다음에요
          </div>
          <div className="okay" onClick={spaceChallenge}>
            시작
          </div>
        </div>
      </ChallengeBox>
    </ChallengeModalWrapper>
  );
};

export default StartChallengeModal;

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
    margin-top: 30px;
    margin-bottom: 36px;
  }

  .btn-1 {
    width: 288px;
    display: flex;
    justify-content: space-between;
  }

  .btn-1 div {
    width: 136px;
    border-radius: 2px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }

  .btn-1 .no {
    background-color: #272727;
    color: #ffffff;
  }
  .btn-1 .okay {
    border: 1px solid #266cf4;
    color: #266cf4;
  }
`;
