import React from "react";
import styled from "styled-components";
import FeedTable from "./FeedTable";
import "../style/index.scss";

const StyledH1 = styled.h1`
  font-size: 36px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 75px;
`;

export default () => {
  return (
    <StyledContainer>
      <StyledH1>Tellor Data Feed</StyledH1>
      <FeedTable />
    </StyledContainer>
  );
};
