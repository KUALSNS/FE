import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ChallengeList from "./ChallengeList";

const ChallengeFeed = () => {
  const category = ["전체", "내일 일기", "감정 노트", "하루 기록", "오늘 칭찬"];

  const [isHovered, setIsHovered] = useState(false);

  const [selectCategory, setSelectCategory] = useState(0);

  return (
    <Container>
      <Title>
        <div>라이언님을 위한 라이톤 30일 글 챌린지</div>
        <div
          className="question"
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ?
        </div>

        {!isHovered ? (
          ""
        ) : (
          <div>
            <div className="hover-question">
              챌린지를 위한 관심 태그를 설정해보세요
            </div>
          </div>
        )}
      </Title>

      <Category>
        <div className="category">
          {category.map((item, idx) => {
            return (
              <div className={idx == 0 ? "itemAll" : "itemExcept"}>
                <div
                  onClick={() => setSelectCategory(idx)}
                  key={idx}
                  className={
                    idx == selectCategory
                      ? idx == 0
                        ? "all"
                        : "except"
                      : idx !== 0
                      ? "not"
                      : "notall"
                  }
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
        <div className="select">골라보기</div>
      </Category>

      {category.map((item, idx) => {
        return (
          <div>
            {selectCategory === 0 ? (
              idx > 0 ? (
                <ChallengeList />
              ) : (
                ""
              )
            ) : selectCategory === 1 ? (
              idx == 1 ? (
                <ChallengeList />
              ) : (
                ""
              )
            ) : selectCategory === 2 ? (
              idx == 2 ? (
                <ChallengeList />
              ) : (
                ""
              )
            ) : selectCategory === 3 ? (
              idx == 3 ? (
                <ChallengeList />
              ) : (
                ""
              )
            ) : selectCategory === 4 ? (
              idx == 4 ? (
                <ChallengeList />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        );
      })}
    </Container>
  );
};

export default ChallengeFeed;

const Container = styled.div`
  background-color: #ffffff;
  max-width: 920px;
  /* margin: auto; */
  height: 700px;
  margin-top: 44px;
  position: relative;
`;

const Title = styled.div`
  font-family: "Happiness Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  /* identical to box height */
  justify-content: center;
  text-align: center;
  display: flex;
  color: #272727;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .question {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    margin-left: 12px;
    background: #fce184;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    text-align: center;
    color: #272727;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .hover-question {
    position: absolute;
    width: 304px;
    height: 32px;
    right: -35px;
    background: #fff8e0;
    border: 1px solid #fce184;
    border-radius: 16px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */
    padding-left: 17px;
    color: #272727;
  }
`;

const Category = styled.div`
  width: 640px;
  height: 40px;
  background-color: #ffffff;
  display: flex;
  margin: auto;
  margin-top: 33px;
  margin-bottom: 53px;
  position: relative;

  .category {
    display: flex;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
  }

  .category .itemAll {
    width: 72px;
    padding-right: 12px;
    cursor: pointer;
  }
  .category .itemExcept {
    width: 104px;
    padding-right: 12px;
    cursor: pointer;
  }

  .category .all {
    padding: 12px 16px;
    display: flex;
    width: 60px;
    height: 40px;
    background: #272727;
    border-radius: 32px;
    color: #ffffff;
  }
  .category .except {
    padding: 12px 16px;
    display: flex;
    width: 92px;
    height: 40px;
    background: #272727;
    border-radius: 32px;
    color: #ffffff;
  }

  .category .not {
    padding: 12px 16px;
    display: flex;
    width: 92px;
    height: 40px;
    background: #f3f5f9;
    border-radius: 32px;
    color: #272727;
  }

  .category .not:hover {
    padding: 12px 16px;
    display: flex;
    width: 94px;
    height: 40px;
    background: #e1dddd;
    border-radius: 32px;
    color: #272727;
  }

  .category .notall {
    padding: 12px 16px;
    display: flex;
    width: 60px;
    height: 40px;
    background: #f3f5f9;
    border-radius: 32px;
    color: #272727;
  }

  .category .notall:hover {
    padding: 12px 16px;
    display: flex;
    width: 62px;
    height: 40px;
    background: #e1dddd;
    border-radius: 32px;
    color: #272727;
  }

  .select {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;

    position: absolute;
    width: 90px;
    height: 40px;
    right: 0;

    border: 1px solid #266cf4;
    border-radius: 2px;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    color: #266cf4;
  }
`;
