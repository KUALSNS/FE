import React from "react";
import styled from "styled-components";

const ChallengeItem = () => {
  return (
    <Container>
      <div className="container">
        <div className="inner">
          <div className="text">나를 위해 미래 일기 작성하기</div>
          <div className="tag">
            <div className="tag-left">☘️ 내일 일기</div>
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
    font-size: 18px;
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
    /* identical to box height, or 114% */
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
    /* identical to box height, or 114% */
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
