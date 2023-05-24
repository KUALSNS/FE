import React from "react";
import styled from "styled-components";
import RecordCalendar from "../components/RecordCalendar";
import RecordChallenges from "../components/RecordChallenges";
import RecordGrowth from "../components/RecordGrowth";
import SubscribeCupon from "../components/SubscribeCupon";
import { useRecoilValue } from "recoil";
import { recordModalState } from "../atoms/auth";
function Record() {
  const showGrowth = useRecoilValue(recordModalState);
  return (
    <div>
      <SubscribeCupon />
      <Container>
        <RecordCalendar />
        <RecordChallenges />
      </Container>
      <RecordGrowth />
    </div>
  );
}

export default Record;

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  position: relative;
  max-width: 1178px;
  margin: auto;
  height: auto;
  margin-top: 80px;
  padding-bottom: 85px;
  padding-left: 140px;
`;
