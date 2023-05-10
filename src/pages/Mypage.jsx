import React from "react";
import LeftNav from "../components/LeftNav";
import styled from "styled-components";

function Mypage() {
  return (
    <div>
      <Container>Mypage</Container>
    </div>
  );
}

export default Mypage;

const Container = styled.div`
  background-color: lightgray;
  max-width: 920px;
  margin: auto;
  height: 1000px;
  margin-top: 64px;
`;
