import React from "react";
import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  return (
    <ProgressBar1>
      <CircularProgressbarWithChildren
        strokeWidth={7}
        background={true}
        value={7}
        styles={{
          path: {
            stroke: "#266CF4",
            strokeLinecap: "butt",
          },
          trail: {
            stroke: "#d6d6d6",
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          background: {
            fill: "#ffffff",
          },
        }}
      >
        <img
          width={62}
          style={{ fontSize: 12, marginTop: 10 }}
          src="progress1.svg"
          alt="doge"
        />

        <div className="percentage">7%</div>
      </CircularProgressbarWithChildren>
      <div className="text">내일 일기</div>
    </ProgressBar1>
  );
};

export default Progress;

const ProgressBar1 = styled.div`
  /* background-color: lightgreen; */
  /* width: 100%; */

  width: 65px;
  height: 65px;
  z-index: 1;
  margin-right: 40px;

  .percentage {
    position: absolute;
    color: white;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
  }

  .text {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    /* identical to box height, or 100% */

    text-align: center;

    color: #7c8089;
    margin-top: 8px;
  }
`;
