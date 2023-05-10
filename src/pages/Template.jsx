import React from "react";
import styled from "styled-components";

function Template() {
  return (
    <div>
      <Container>record</Container>
    </div>
  );
}

export default Template;

const Container = styled.div`
  background-color: lightgray;
  max-width: 920px;
  margin: auto;
  height: 1000px;
  margin-top: 64px;
`;
