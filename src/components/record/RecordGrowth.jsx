import React, { useState, useEffect } from "react";

import { styled } from "styled-components";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  subscribedState,
  recordModalState,
  subscribeModalState,
  detailuserState,
} from "../../atoms/auth";
import RecordGrowthGraph from "./RecordGrowthGraph";
import RecordGrowthTable from "./RecordGrowthTable";

import RecordGrowthBlocks from "./RecordGrowthBlocks";
import { getPlannerStatistic, postActivateCupon } from "../../remotes";

function RecordGrowth() {
  const detailuser = useRecoilValue(detailuserState);
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const thisMonthTotalDate = new Date(year, month + 1, 0).getDate();
  const lastMonthTotalDate = new Date(year, month, 0).getDate();
  const [monthState, setMonthState] = useState({
    comparisonWord: "0일 더",
    lastMonth: 0,
    missed: 0,
    ongoing: 0,
    thisMonth: 0,
    thisMonthTotalDate: thisMonthTotalDate,
    lastMonthTotalDate: lastMonthTotalDate,
    showThisMonth: month + 1,
    showLastMonth: month,
  });
  const [weekState, setWeekState] = useState({
    comparisonWord: "0일 더",
    lastWeek: [],
    lastWeekCount: 0,
    missed: 7,
    ongoing: 0,
    thisWeek: [],
    thisWeekCount: 0,
  });
  const [showState, setShowState] = useRecoilState(recordModalState);
  const setSubscribeModalState = useSetRecoilState(subscribeModalState);
  const [subscriber, setSubscriber] = useRecoilState(subscribedState);

  useEffect(() => {
    getPlannerStatistic()
      .then((res) => {
        const userMonth = res.data.data.userStatistics.month;
        setMonthState({
          ...monthState,
          comparisonWord: userMonth.comparisonWord,
          lastMonth: userMonth.lastMonth,
          missed: userMonth.missed,
          ongoing: userMonth.ongoing,
          thisMonth: userMonth.thisMonth,
        });
        const userWeek = res.data.data.userStatistics.week;
        if (userWeek) {
          setWeekState({
            comparisonWord: userWeek.comparisonWord,
            lastWeek: userWeek.lastWeek,
            lastWeekCount: userWeek.lastWeekCount,
            missed: userWeek.missed,
            ongoing: userWeek.ongoing,
            thisWeek: userWeek.thisWeek,
            thisWeekCount: userWeek.thisWeekCount,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCuponClick = () => {
    postActivateCupon()
      .then((res) => {
        console.log(res);
        setSubscribeModalState(true);
        setSubscriber(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <RecordGrowthWrapper showState={showState}>
      <div className="topbar">
        <div className="xbtn" onClick={() => setShowState(false)}>
          <img src="record_modal_xbtn.svg"></img>
        </div>
        <div className="logoArea">
          <img src="record_modal_logo.svg"></img>성장 분석
        </div>
      </div>

      <div className="statistics">
        <h2>
          {detailuser.nickname} 님,
          <br />
          이번 달은 {monthState.thisMonth}일 챌린지를 완료했어요
        </h2>
        <p>
          지난 달보다{" "}
          <span className="blue">{monthState.comparisonWord} 달성</span>했어요!
        </p>
        <div className="visualized">
          <RecordGrowthGraph props={monthState} />
        </div>
        <div className="explain">
          <RecordGrowthBlocks props={monthState} />
        </div>
      </div>

      <div className="weeklyStatistics">
        {subscriber ? (
          <>
            <h2>이번주는 {weekState.thisWeekCount}일 챌린지를 완료했어요</h2>
            <p>
              지난 주보다{" "}
              <span className="blue">{weekState.comparisonWord} 달성</span>
              했어요!
            </p>
            <div className="visualized">
              <RecordGrowthTable props={weekState} />
            </div>
            <div className="explain">
              <RecordGrowthBlocks props={weekState} />
            </div>
          </>
        ) : (
          <>
            <h2>이번 주 분석은 열람이 필요해요</h2>
            <div className="subscribeArea">
              <div className="cupon">
                <h2>라이톤 업 구독자만 읽을 수 있어요 😢</h2>
                <p>멤버십에 가입하려면 하단 버튼을 클릭해주세요</p>
                <button onClick={() => handleCuponClick()}>
                  체험하기 쿠폰 사용
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </RecordGrowthWrapper>
  );
}
const RecordGrowthWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  position: fixed;
  max-height: 100vh;
  overflow-y: auto;
  top: 0;
  right: 0;
  height: 100%;
  background: #ffffff;
  width: 470px;
  z-index: 20;
  box-shadow: -10px 4px 16px -12px rgba(39, 39, 39, 0.1);
  padding: 58px 40px;
  transform: ${(props) =>
    props.showState ? "translateX(0%);" : "translateX(100%);"};
  transition: transform 0.5s ease-in-out;
  .topbar {
    margin-top: 18px;
    margin-bottom: 68px;
    display: flex;
    justify-content: space-between;
  }
  .topbar .xbtn {
    cursor: pointer;
  }
  .statistics h2 {
    font-family: "Happiness-Sans-Bold", sans-serif;
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .statistics p {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .blue {
    color: var(--challenging-blue);
  }
  .visualized {
    height: 176px;
    background: #f5f9ff;
    margin-bottom: 9px;
  }
  .explain {
    display: flex;
    gap: 9px;
    height: 70px;
  }
  .explainitem {
    flex: 1;
    text-align: center;
    background: #f5f9ff;
    border: 8px;
    padding: 8px auto;
  }
  .explainitem .tag {
    color: #7c8089;
    font-size: 10px;
    margin: 8px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #bcd6ff;
    border-radius: 32px;
  }
  .explainitem .text {
    font-size: 14px;
  }
  .weeklyStatistics h2 {
    margin-top: 60px;
    font-family: "Happiness-Sans-Bold", sans-serif;
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 24px;
  }
  .cupon {
    height: 189px;
    background: url("record_modal_cupon_background.svg") no-repeat;
    border: 1px solid #e2e4e7;
    border-radius: 8px;
    text-align: center;
  }
  .cupon h2 {
    margin-top: 41px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
  }

  .cupon p {
    font-size: 12px;
    line-height: 15px;
    color: #7c8089;
    margin-bottom: 15px;
  }

  .cupon button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    margin: auto;
    width: 142px;
    height: 40px;
    background: #266cf4;
    color: #ffffff;
    border: 0;
    font-size: 14px;
    border-radius: 2px;
  }
`;

export default RecordGrowth;
