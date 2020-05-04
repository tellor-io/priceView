import React, {Fragment} from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from 'antd'
import styled from 'styled-components'
import { HomePage } from 'components'

const StyledHeaderTellor = styled.span`
  color: white;
  font-size: 36px;
`
const StyledHeaderData = styled.span`
  color: #53F1B6;
  font-size: 36px;
`

const StyledLayout = styled(Layout)`
  height: 100%;
`

const App = () => {
  const { Header,  Content } = Layout;

  return (
    <Fragment>
      <Helmet defaultTitle="Tellor">
        <meta name="description" content="Travels project" />
      </Helmet>
      <StyledLayout>
        <Header>
          <StyledHeaderTellor>tellor</StyledHeaderTellor>
          <StyledHeaderData>data</StyledHeaderData>
        </Header>
        <Content>
          <HomePage />
        </Content>
      </StyledLayout>
    </Fragment>
  )
}

export default App
