import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getISOWeek,
} from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";

const RenderCells = ({ currentMonth, selectDate, onDateClick, open }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  console.log(startDate, endDate);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const startOfWeekDate = startOfWeek(startOfMonthDate);
  const weekNumber = getISOWeek(today) - getISOWeek(startOfWeekDate) - 1;
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
            {"13" === formattedDate ||
            "20" === formattedDate ||
            "10" === formattedDate ? (
              <img width={20} src="progress4.svg" alt="대체이미지" />
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
