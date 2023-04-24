import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const ModalCompo = ({
  open,
  onClose,
  maxWidth = 'md',
  title,
  children,
  divider = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={divider}>{children}</DialogContent>
    </Dialog>
  )
}

export default ModalCompo
