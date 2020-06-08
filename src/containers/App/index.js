import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { HomePage } from "components";
import { Footer } from "components/Footer";
import TellorLogoDark from "../../assets/Tellor__Logo--Dark.png";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
`;

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

const StyledHeaderNav = styled.div`
  display: inline-block;
  margin-left: auto;
  > button {
    padding: 0px 15px !important;
  }
  > * {
    margin-left: 25px;
    font-size: 1.5em;
    color: #5cfcb6;
    // &:last-child {
    //   border: 2px solid #5cfcb6;
    //   color: #5cfcb6;
    //   border-radius: 50px;
    //   padding: 10px 15px;
    //   vertical-align: middle;
    // }

    @media (max-width: 800px) {
      font-size: 1em;
      margin-left: 15px;
    }
  }
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
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
          <StyledHeader>
            <StyledBrandLink>
              <img src={TellorLogoDark} />
              <span>data</span>
            </StyledBrandLink>
            <StyledHeaderNav>
              <a href="#" rel="noopener noreferrer" target="_blank">
                Dispute Center <RightCircleOutlined />
              </a>
            </StyledHeaderNav>
          </StyledHeader>
        </Header>
        <Content>
          <HomePage />
        </Content>
        <Footer />
      </StyledLayout>
    </Fragment>
  );
};

export default App;
