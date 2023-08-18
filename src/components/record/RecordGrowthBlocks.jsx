import React, { useEffect, useState } from "react";

function RecordGrowthBlocks({ props }) {
  const monthState = props;
  const weekState = props;
  const [statData, setStatData] = useState([
    {
      tag: (
        <span>
          <span className="blue">0</span>/0일
        </span>
      ),
      text: "참여일",
    },
    {
      tag: <span className="blue">0</span>,
      text: "진행 중 챌린지",
    },
    {
      tag: <span>0일</span>,
      text: "미달성일",
    },
  ]);

  useEffect(() => {
    if (props.thisMonth) {
      setStatData([
        {
          tag: (
            <span>
              <span className="blue">{monthState.thisMonth}</span>/
              {monthState.thisMonthTotalDate}일
            </span>
          ),
          text: "참여일",
        },
        {
          tag: <span className="blue">{monthState.ongoing}</span>,
          text: "진행 중 챌린지",
        },
        {
          tag: <span>{monthState.missed}일</span>,
          text: "미달성일",
        },
      ]);
    } else {
      setStatData([
        {
          tag: (
            <span>
              <span className="blue">{weekState.thisWeekCount}</span>/7일
            </span>
          ),
          text: "참여일",
        },
        {
          tag: <span className="blue">{weekState.ongoing}</span>,
          text: "진행 중 챌린지",
        },
        {
          tag: <span>{weekState.missed}일</span>,
          text: "미달성일",
        },
      ]);
    }
  }, [props]);

  return (
    <>
      {statData.map((item, index) => (
        <div className="explainitem" key={index}>
          <div className="tag">{item.tag}</div>
          <div className="text">{item.text}</div>
        </div>
      ))}
    </>
  );
}

export default RecordGrowthBlocks;
