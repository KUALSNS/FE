import React, { useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { recordModalState } from "../atoms/auth";
import Calendar from "./calendar/Calendar";
import { format, addMonths, subMonths } from "date-fns";

function RecordCalendar() {
  const [showAll, setShowAll] = useState(false);
  const [showGrowth, setShowGrowth] = useRecoilState(recordModalState);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const preMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <CalendarWrapper>
      <div className="topbar">
        <div className="yearMonth">
          <img className="spaceMonth" src="LeftArrow.svg" onClick={preMonth} />
          <span className="text">
            {format(currentMonth, "yyyy")}년
            <span> {format(currentMonth, "M")}월</span>
          </span>
          <img
            className="spaceMonth"
            src="RightArrow.svg"
            onClick={nextMonth}
          />
        </div>

        <button className="show" onClick={() => setShowAll(!showAll)}>
          <img src="calendar_showBtnIcon.svg" />
          {showAll ? "달력 접기" : "달력 펼치기"}
        </button>
        <button className="grow" onClick={() => setShowGrowth(!showGrowth)}>
          <img src="calendar_growBtnIcon.svg" />
          성장
        </button>
      </div>
      <Calendar
        showAll={showAll}
        setShowAll={setShowAll}
        currentMonth={currentMonth}
      />
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  width: 100%;
  .topbar {
    position: relative;
    padding-top: 48px;
    padding-bottom: 16px;
    display: flex;
  }

  .topbar .yearMonth {
    display: flex;
    align-items: center;
  }

  .yearMonth .text {
    margin-left: 14px;
    margin-right: 14px;
    font-family: "Happiness Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #272727;
  }

  .topbar .spaceMonth {
    cursor: pointer;
  }
  .topbar h2 {
    font-family: "Happiness-Sans-Bold", sans-serif;
    font-size: 18px;
    width: 94px;
    height: 23px;
    margin-right: 2px;
    display: inline-block;
  }
  .topbar .dropdown {
    margin-right: 24px;
  }
  .topbar button {
    width: 123px;
    height: 40px;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 2px;
  }
  .topbar button img {
    margin-right: 8px;
  }
  .topbar .show {
    background: #ffffff;
    border: 1px solid #e2e4e7;
    margin-left: 24px;
  }
  .topbar .grow {
    position: absolute;
    right: 0;
    background: #dee9fd;
    border: 1px solid #bcd6ff;
  }

  /* .monthly {
    height: 826px;
    transition: height 0.5s ease-in-out;
    background-color: grey;
  } */

  /* .weekly {
    height: 214px;
    transition: height 0.3s ease-in-out;
    background-color: grey;
  } */
`;

export default RecordCalendar;
