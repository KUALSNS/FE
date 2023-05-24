import React from "react";
import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";

const Progress = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      <div
        className={`text ${isHovered && "hover-challenge"}`}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.challenges}
      </div>
    </ProgressBar1>
  );
};

export default Progress;

const ProgressBar1 = styled.div`
  /* background-color: lightgreen; */
  /* width: 100%; */

  width: 65px;
  margin-right: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

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
  .hover-challenge {
    width: fit-content;
    background: #ffffff;
    border: 1px solid #e2e4e7;
    border-radius: 32px;
    z-index: 10;
    height: 26px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    padding: 5px 12px;
  }
`;
