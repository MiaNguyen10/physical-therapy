import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const AddButton = ({desc, url, sx}) => {
    const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<AddIcon />}
      sx={{ float: 'right', mb: 3, ...sx }}
      onClick={() => navigate(url)}
    >
      {desc}
    </Button>
  )
}

export default AddButton