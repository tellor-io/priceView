import React, { useState } from 'react'
import styled from 'styled-components'
import FeedTable from './FeedTable'

const StyledHeader = styled.label`
  font-size: 36px;
  color: white;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default () => {

  return (
    <StyledContainer>
      <StyledHeader>Tellor Data Feed</StyledHeader>
      <FeedTable />
    </StyledContainer>
  )
}
