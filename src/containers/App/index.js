import React, {Fragment} from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { notification, Layout } from 'antd'
import styled from 'styled-components'
import { HomePage } from 'components'

import { makeSelectAlert } from 'selectors/global.selector'
import { setMessage } from 'actions/global.action'
import {
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  MESSAGE_WARNING,
} from 'constants/global.const'

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

const success = (title, msg) => {
  notification.success({
    message: title,
    description: msg,
  })
}

const error = (title, msg) => {
  notification.error({
    message: title,
    description: msg,
  })
}

const warning = (title, msg) => {
  notification.warning({
    message: title,
    description: msg,
  })
}

const App = ({ alert, setMessage }) => {
  const { title, message, visible, type } = alert
  const { Header, Footer, Sider, Content } = Layout;

  if (visible) {
    switch (type) {
      case MESSAGE_ERROR:
        error(title, message)
        break
      case MESSAGE_SUCCESS:
        success(title, message)
        break
      case MESSAGE_WARNING:
        warning(title, message)
        break
      default:
        break
    }
    setMessage({ type: '', title: '', message: '', visible: false })
  }
  return (
    <Fragment>
      <Helmet defaultTitle="Travels - Test Project">
        <meta name="description" content="Travels project" />
      </Helmet>
      <StyledLayout>
        <Header>
          <StyledHeaderTellor>tellor</StyledHeaderTellor>
          <StyledHeaderData>data</StyledHeaderData>
        </Header>
        <Content>
          <Switch>
            <Route
              path="/"
              component={HomePage}
            />
          </Switch>
        </Content>
      </StyledLayout>
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  alert: makeSelectAlert(),
})

const mapDispatchToProps = {
  setMessage,
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
export default compose(withConnect)(App)
