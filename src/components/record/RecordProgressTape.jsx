import React from "react";
import { styled } from "styled-components";
function RecordProgressTape(props) {
  const progress = props.progress;

  const progressOnTape = (progress * 5) % 100;
  const colorIdx = props.colorIdx % 3;
  const colorArr = ["#266CF4", "#FF4C77", "#FF7F0A"];
  const lineNum = [1, 2, 3, 4, 5];
  const getLineClassName = (line, progress) => {
    const isOddLine = line % 2 === 1;
    const isFull = progress >= line * 20;
    const isHalf = progress > (line - 1) * 20 && progress < line * 20;

    if (isFull) {
      return isOddLine ? "full-left" : "full-right";
    } else if (isHalf) {
      return isOddLine ? "half-left" : "half-right";
    } else {
      return "none";
    }
  };

  return (
    <ProgressTapeWrapper
      progressOnTape={progressOnTape}
      tapeColor={colorArr[colorIdx]}
    >
      <div className="progressText">
        <span>{progress}% </span> {progress === 100 ? "완료" : "진행 중"}
      </div>
      <div className="tape">
        {lineNum.map((line) => (
          <div
            className={`line${line} ${getLineClassName(line, progress)}`}
            key={line}
          ></div>
        ))}
      </div>
      <img className="yellowTape" src="calendar_progress_tape_yellow.svg" />
    </ProgressTapeWrapper>
  );
}
const ProgressTapeWrapper = styled.div`
  position: relative;
  width: 125px;
  .progressText {
    position: absolute;
    z-index: -10;
    top: 114px;
    left: 0;
  }
  .progressText span {
    color: #7c8089;
  }
  .tape {
    width: 125px;
  }
  .tape div {
    position: absolute;
    top: 0;
    height: 14px;
    width: 125px;
    background: var(--challenging-blue);
  }
  .tape .line1 {
  }
  .tape .line2 {
    top: 25px;
    transform: skewY(-15deg);
  }
  .tape .line3 {
    top: 50px;
  }
  .tape .line4 {
    top: 75px;
    transform: skewY(-15deg);
  }
  .tape .line5 {
    top: 92px;
  }
  .tape .full-left {
    background: ${(props) => props.tapeColor};
    animation: fillLeft 1s ease-in-out;
  }
  .tape .full-right {
    background: ${(props) => props.tapeColor};
  }
  .tape .half-left {
    background: linear-gradient(
      to left,
      #f3f5f9,
      #f3f5f9 ${(props) => `${100 - props.progressOnTape}%`},
      ${(props) => props.tapeColor} 0%,
      ${(props) => props.tapeColor}
    );
  }
  .tape .half-right {
    background: linear-gradient(
      to right,
      #f3f5f9,
      #f3f5f9 ${(props) => `${100 - props.progressOnTape}%`},
      ${(props) => props.tapeColor} 0%,
      ${(props) => props.tapeColor}
    );
  }
  .tape .none {
    background: #f3f5f9;
  }
  .yellowTape {
    position: absolute;
    right: -11px;
    top: 92px;
  }
  @keyframes fillLeft {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export default RecordProgressTape;
