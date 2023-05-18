import React from "react";
import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = ({ item, idx }) => {
  return (
    <ProgressBar1>
      <CircularProgressbarWithChildren
        strokeWidth={5}
        background={true}
        value={item.achievement}
        styles={{
          path: {
            stroke: `${
              idx % 3 === 0
                ? "#266CF4"
                : idx % 3 === 1
                ? "#FF4C77"
                : idx % 3 === 2
                ? "#FF7F0A"
                : ""
            }`,
            strokeLinecap: "butt",
          },
          trail: {
            stroke: "#E1EAF8",
            strokeLinecap: "butt",
            // transition: "stroke-dashoffset 0.5s ease 0s",
            // // Rotate the path
            // transform: "rotate(0.25turn)",
            // transformOrigin: "center center",
          },
          background: {
            fill: "#ffffff",
          },
        }}
      >
        <img
          width={47}
          height={47}
          style={{ fontSize: 12, display: "flex" }}
          src={
            idx % 3 === 0
              ? "progress4.svg"
              : idx % 3 === 1
              ? "progress1.svg"
              : idx % 3 === 2
              ? "progress2.svg"
              : ""
          }
          alt="이미지"
        />

        <div className="percentage">{item.achievement}%</div>
      </CircularProgressbarWithChildren>
      <div className="text">{item.challenges}</div>
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
    width: 65px;
    color: #7c8089;
    margin-top: 8px;
    white-space: nowrap; /* 줄 바꿈 없이 한 줄에 텍스트를 표시 */
    overflow: hidden; /* 너비를 넘어가는 텍스트를 숨김 */
    text-overflow: ellipsis;
  }
  .text:hover {
    overflow: visible;
    white-space: normal;
  }
`;
