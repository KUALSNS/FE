import { React, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  authState,
  loadingState,
  ChallengeWriteState,
  selectChallengeState,
  challengeToastState,
} from "../atoms/auth";
import { getChallengePage, getAccessToken } from "../remotes";

const ChallengeItem = ({ title, category, image }) => {
  const emoticon = ["☘️", "🌕", "🗒", "👍"];
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [selectChallenge, setSelectChallenge] =
    useRecoilState(selectChallengeState);
  const [writeChallenge, setWriteChallenge] =
    useRecoilState(ChallengeWriteState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [toast, setToast] = useRecoilState(challengeToastState);

  function Retoken() {
    return getAccessToken()
      .then((res) => {
        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
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
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 419) {
          return Retoken().then(() => getChallengePage(title));
        } else if (err.response && err.response.status === 415) {
          setLoading(false);
          setToast("이미 진행 중인 챌린지에요!");
        } else if (err.response && err.response.status === 418) {
          setLoading(false);
          setToast("더 이상 챌린지를 진행할 수 없어요!");
        } else {
          console.error(err);
        }
      });
  }

  const spaceChallengePage = () => {
    if (auth) {
      setLoading(true);
      localStorage.removeItem("fixChallenge");
      getChallengePageWithTokenRefresh(title);
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <div className="container" onClick={spaceChallengePage}>
        <div className="inner">
          <div className="text">{title}</div>
          <div className="tag">
            <div className="tag-left">
              {category === "내일 일기"
                ? emoticon[0]
                : category === "감정 노트"
                ? emoticon[1]
                : category === "하루 기록"
                ? emoticon[2]
                : category === "오늘 칭찬"
                ? emoticon[3]
                : ""}{" "}
              {category}
            </div>
            <div className="tag-right"> 30일</div>
          </div>
          <div className="write">
            <img src="pencil.svg" />
            글쓰기
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChallengeItem;

const Container = styled.div`
  width: 288px;
  height: 173px;
  background-color: #f3f5f9;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #f3f5f9;
    box-shadow: 0px 18px 20px -18px rgba(39, 39, 39, 0.2);
    border-radius: 8px;
    margin-top: -8px;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    width: 256px;
    height: 130.96px;
    background-color: #f3f5f9;
    margin: 26px auto 16px;
    justify-content: space-between;
  }

  .inner .text {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 17.9px;
    line-height: 24px;
    text-align: center;

    color: #272727;
  }

  .inner .tag {
    display: flex;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    height: 24px;
    color: #7c8089;
  }

  .tag-left {
    width: 100px;
    height: 24px;

    background: #e1eaf8;
    border: 1px solid #bcd6ff;
    border-radius: 32px;
    align-items: center;
    padding: 8px 12px;
    display: flex;
    flex-direction: row;
    margin-right: 8px;
    font-size: 13.5px;
  }

  .tag-right {
    width: 56px;
    height: 24px;

    background: #e1eaf8;
    border: 1px solid #bcd6ff;
    border-radius: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
  }

  .inner .write {
    display: flex;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    align-items: center;
    text-align: center;

    color: #272727;
    width: 256px;
    height: 34.96px;
    justify-content: center;
    background-color: #ffffff;
  }

  .write img {
    margin-right: 8px;
  }
`;
