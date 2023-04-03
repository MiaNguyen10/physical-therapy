import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import CategoryForm from './components/CategoryForm'

const AddCategory = () => {
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM DANH MỤC</Typography>
        <CategoryForm />
      </Stack>
    </Container>
  )
}

export default AddCategory