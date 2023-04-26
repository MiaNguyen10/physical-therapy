import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import React from 'react'

const OpenModalButton = ({ desc, sx, onOpen }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<AddIcon />}
      sx={{ float: 'right', mb: 3, ...sx }}
      onClick={onOpen}
    >
      {desc}
    </Button>
  )
}

export default OpenModalButton
