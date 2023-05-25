import React from "react";
import { styled } from "styled-components";
function RecordGrowthGraph({ props }) {
  const monthState = props;
  const prevMonthHeight =
    (monthState.lastMonth / monthState.lastMonthTotalDate) * 100 + "%";
  const curMonthHeight =
    (monthState.thisMonth / monthState.thisMonthTotalDate) * 100 + "%";
  return (
    <Graph>
      <div className="prevMonth">
        <div className="prevMonthbar" style={{ height: prevMonthHeight }} />
        <span className="date">{monthState.lastMonth}일</span>
        <span className="month">{monthState.showLastMonth}월</span>
      </div>
      <div className="curMonth">
        <div className="curMonthbar" style={{ height: curMonthHeight }} />
        <span className="date">{monthState.thisMonth}일</span>
        <span className="month">{monthState.showThisMonth}월</span>
      </div>
    </Graph>
  );
}

const Graph = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  span {
    font-size: 12px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .date {
    font-size: 10px;
    bottom: 5px;
  }
  .month {
    font-size: 12px;
    bottom: -25px;
  }
  .prevMonth .date {
    color: #7c8089;
  }
  .curMonth .date {
    color: #ffffff;
  }
  div {
    position: relative;
    margin-top: 25px;
    height: 110px;
    width: 67px;
    border-radius: 2px;
    background: #e1eaf8;
  }
  .prevMonthbar {
    bottom: 0;
    position: absolute;
    background: #fce184;
  }
  .curMonthbar {
    bottom: 0;
    position: absolute;
    background: #266cf4;
  }
`;

export default RecordGrowthGraph;
