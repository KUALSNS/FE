import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
function RecordGrowthTable({ props }) {
  const weekState = props;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [prevWeek, setPrevWeek] = useState([]);
  const [curWeek, setCurWeek] = useState([]);
  const parsedPrevWeek = weekState.lastWeek.map((dateString) =>
    new Date(dateString).getDate()
  );
  const parsedCurWeek = weekState.thisWeek.map((dateString) =>
    new Date(dateString).getDate()
  );

  useEffect(() => {
    findWeeklyDate();
  }, []);

  const findWeeklyDate = () => {
    const today = new Date();
    const day = today.getDay();
    const date = today.getDate();
    const sunday = new Date(today);
    sunday.setDate(date - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      curWeek.push(date.getDate());
      prevWeek.push(date.getDate() - 7);
    }
    setPrevWeek(prevWeek);
    setCurWeek(curWeek);
  };

  return (
    <Table>
      <div className="week">
        {week.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
      <div className="prevWeek checkarea">
        <span>지난주</span>
        {prevWeek.map((check, idx) => (
          <div
            key={idx}
            className={
              parsedPrevWeek.indexOf(check) > -1 ? "checkbox" : "emptybox"
            }
          ></div>
        ))}
      </div>
      <div className="curWeek checkarea">
        <span>이번주</span>
        {curWeek.map((check, idx) => (
          <div
            key={idx}
            className={
              parsedCurWeek.indexOf(check) > -1 ? "checkbox" : "emptybox"
            }
          ></div>
        ))}
      </div>
    </Table>
  );
}

const Table = styled.div`
  padding: 22px 18px;
  .week {
    display: flex;
    margin-left: 62px;
    gap: 14px;
  }
  .week div {
    flex-basis: 32px;
    font-weight: 600;
    font-size: 12px;
    color: #7c8089;
  }
  .checkarea {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
  }
  .checkarea span {
    color: #7c8089;
    font-size: 12px;
    flex-basis: 34px;
  }
  .checkarea div {
    width: 32px;
    height: 32px;
    background: #e1eaf8;
    border-radius: 2px;
  }
  .prevWeek .checkbox {
    background: url("record_modal_yellowcheck.svg");
  }
  .curWeek .checkbox {
    background: url("record_modal_bluecheck.svg");
  }
`;

export default RecordGrowthTable;
