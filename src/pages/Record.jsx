import React from "react";
import styled from "styled-components";

function Record() {
  return (
    <div>
      <Container>record</Container>
    </div>
  );
}

export default Record;

const Container = styled.div`
  background-color: lightgray;
  max-width: 920px;
  margin: auto;
  height: 1000px;
  margin-top: 64px;
`;
