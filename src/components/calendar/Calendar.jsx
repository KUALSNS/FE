import React, { useEffect } from "react";
import { useState } from "react";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";

const Calendar = ({ showAll, currentMonth }) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const onDateClick = (day) => {
    setSelectDate(day);
  };

  return (
    <div className="calendar">
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectDate={selectDate}
        onDateClick={onDateClick}
        open={showAll}
      />
    </div>
  );
};

export default Calendar;
