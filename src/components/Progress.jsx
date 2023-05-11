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
        value={40}
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

        <div className="percentage">40%</div>
      </CircularProgressbarWithChildren>
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

  .percentage {
    position: absolute;
    color: white;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
  }
`;
