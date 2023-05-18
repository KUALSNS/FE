import React from "react";
import styled from "styled-components";
import Progress from "../components/Progress";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { activeChallengeState, authState } from "../atoms/auth";
import { useNavigate } from "react-router-dom";

const ChallengeStory = () => {
  const [close, setClose] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const auth = useRecoilValue(authState);
  const activeChallenge = useRecoilValue(activeChallengeState);
  const navigate = useNavigate();
  console.log(activeChallenge);
  const AddStory = () => {
    if (auth) {
      navigate("/challenge");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      {auth ? (
        <div className="story-container">
          <div className="add-challenge" onClick={AddStory}>
            <img src="/addStory.svg" />
          </div>
          <div className="progressies">
            {activeChallenge?.userChallengeArray?.map((item, idx) => {
              return <Progress item={item} idx={idx} key={idx} />;
            })}
          </div>
          {close ? (
            <div
              className="challenge-text"
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {!isHovered ? (
                <div>🔥 이번 달 챌린지는 6월 9일 마감이에요</div>
              ) : (
                <div>
                  <div className="hover-text1">
                    🔥 이번 달 챌린지는 6월 9일 마감이에요
                  </div>
                  <div className="hover-text2">
                    5월 9일 부터 30일 동안 진행돼요
                  </div>
                </div>
              )}
              <div className="close">
                <img
                  onClick={() => setClose(false)}
                  width={10}
                  src="close.svg"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="story-container">
          <div className="add-challenge" onClick={AddStory}>
            <img src="addStory.svg" />
          </div>
          {close ? (
            <div className="before-challenge-text">
              <div>🔥 30일 글 챌린지로 꾸준한 글쓰기를 시작해볼까요?</div>
              <div className="close">
                <img
                  onClick={() => setClose(false)}
                  width={8}
                  src="/close.svg"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Container>
  );
};

export default ChallengeStory;

const Container = styled.div`
  .progressies {
    display: flex;
    width: 400px;
    overflow-x: auto;
    white-space: nowrap;
    height: 110px;
    margin-top: 40px;
  }

  .progressies::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera 용 */
  }
  .story-container {
    background-color: #ffffff;
    max-width: 920px;
    /* margin: auto; */
    height: 105px;
    margin-top: 40px;
    padding-bottom: 32px;
    display: flex;
    border-bottom: 1px solid #e2e4e7;
    position: relative;
    align-items: center;
    z-index: 0;
  }

  .add-challenge {
    width: 65px;
    height: 65px;
    background-color: #272727;
    color: #266cf4;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    margin-left: 33px;
    margin-right: 40px;
  }

  .challenge-text {
    width: 302px;
    height: 32px;
    text-align: center;
    border: 1px solid #fce184;
    border-radius: 16px;
    display: flex;
    position: absolute;
    right: 0;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff8e0;
  }

  .before-challenge-text {
    display: flex;
    align-items: center;
    padding: 8px 16px;

    position: absolute;
    width: 390px;
    height: 32px;

    background: #fff8e0;
    border: 1px solid #fce184;
    border-radius: 16px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    margin-left: 114px;
  }

  .close {
    margin-left: 8px;
    cursor: pointer;
    align-items: center;
    display: flex;
  }

  .challenge-text:hover {
    width: 302px;
    height: 59px;
    border: 1px solid #fce184;
    border-radius: 16px;
    padding-bottom: 15px;
  }

  .hover-text1 {
    margin-bottom: 4px;
  }

  .hover-text2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    /* identical to box height, or 167% */
    position: absolute;
    left: 40px;
    color: #7c8089;
  }
`;
