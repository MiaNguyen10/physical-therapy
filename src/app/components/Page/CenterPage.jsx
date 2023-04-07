import { Box, Container, styled } from '@mui/material'
import React from 'react'

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '38px',
})

const ColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const CenterPage = ({ children }) => {
  return (
    <StyledContainer>
      <ColumnBox>{children}</ColumnBox>
    </StyledContainer>
  )
}

export default CenterPage

