import { addMonths, subMonths } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";
import { getPlannerCalendar } from "../../remotes";

const Calendar = ({ showAll, currentMonth }) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onDateClick = (day) => {
    setSelectDate(day);
  };

  useEffect(() => {
    getPlannerCalendar("2023-05-01", "2023-05-20")
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
  }, [])
  

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
