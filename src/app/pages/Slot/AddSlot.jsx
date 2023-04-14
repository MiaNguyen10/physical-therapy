import { Container, Stack, Typography } from '@mui/material'
import { selectToken } from 'cores/reducers/authentication'
import { addSlot } from 'cores/thunk/slot'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../../cores/reducers/category'
import { getStatusSlots } from '../../../cores/reducers/slot'
import ConfirmDialog from '../../components/Dialog/ConfirmDialog'
import pages from '../../config/pages'
import SlotForm from './components/SlotForm'

const AddSlot = () => {
  const dispatch = useDispatch()
  let categories = useSelector(getCategories)
  const token = useSelector(selectToken)

  const slotStatus = useSelector(getStatusSlots)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
    navigate(`${pages.slotListPath}`)
  }

  const handleFormSubmit = ({ slotName, timeStart, timeEnd }) => {
    const slot = {
      slotName: slotName,
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      available: true,
      isDeleted: false,
    }
    try {
      dispatch(addSlot({ slot, token })).unwrap()
      setOpen(true)
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err)
    }
  }

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: '38px' }}>
        <Typography variant="h1">THÊM SLOT</Typography>
        <SlotForm
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === 'loading'}
          categories={categories}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Thêm slot thành công"
      />
    </Container>
  )
}

export default AddSlot
