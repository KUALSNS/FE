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

    text-align: center;
    width: 65px;
    color: #7c8089;
    margin-top: 8px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }
  .hover-challenge {
    width: fit-content;
    background: #ffffff;
    border: 1px solid #e2e4e7;
    border-radius: 32px;
    z-index: 10;
    height: 26px;
    padding: 5px 12px;
  }
`;
