import React,{useEffect, useState} from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getISOWeek,
} from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";
import { getPlannerCalendar } from "../../remotes";

const RenderCells = ({ currentMonth, selectDate, onDateClick, open, weekNumber }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  const stampImgArr = ['calendar_stamp1.svg','calendar_stamp2.svg','calendar_stamp3.svg'];
  const [completeDate, setCompleteDate] = useState([]);
  useEffect(() => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    getPlannerCalendar(start, end)
    .then((res)=>{
      const completeDateRaw = res.data.data.completedChallengesDate;
      const completeDate = completeDateRaw.map(d=>{
        return format(new Date(d), "d")
      })
      setCompleteDate(completeDate);
    })
    .catch((err)=>console.log(err));
  }, [currentMonth])

  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const startOfWeekDate = startOfWeek(startOfMonthDate);
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <div className="innerday">
            <div
              className={
                format(currentMonth, "M") !== format(day, "M")
                  ? "text not-valid"
                  : ""
              }
            >
              {formattedDate}
            </div>
            {completeDate.indexOf(formattedDate)>-1? (
              <img width={20} src={stampImgArr[formattedDate%3]} alt="스탬프" />
            ) : (
              ""
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div>
      {!open ? (
        <div className="body">{rows[weekNumber]}</div>
      ) : (
        <div className="body">{rows}</div>
      )}
    </div>
  );
};

export default RenderCells;
