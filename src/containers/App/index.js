import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import styled from "styled-components";
import { HomePage } from "components";
import TellorLogoDark from "../../assets/Tellor__Logo--Dark.png";

const StyledBrandLink = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  img {
    height: 60px;
    width: auto;
    display: inline-block;
  }
  span {
    color: #5cfcb6;
    font-size: 21px;
    font-weight: 300;
    margin-bottom: -11px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    span {
      display: none;
    }
  }
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const App = () => {
  const { Header, Content } = Layout;

  return (
    <Fragment>
      <Helmet defaultTitle="Tellor">
        <meta name="description" content="Travels project" />
      </Helmet>
      <StyledLayout>
        <Header>
          <StyledBrandLink>
            <img src={TellorLogoDark} />
            <span>data</span>
          </StyledBrandLink>
        </Header>
        <Content>
          <HomePage />
        </Content>
      </StyledLayout>
    </Fragment>
  );
};

export default App;
