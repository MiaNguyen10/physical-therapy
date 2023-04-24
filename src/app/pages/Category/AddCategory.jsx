import ModalCompo from 'app/components/ModalCompo'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getStatusCategory } from '../../../cores/reducers/category'
import { addCategory } from '../../../cores/thunk/category'
import ConfirmDialog from '../../components/Dialog/ConfirmDialog'
import pages from '../../config/pages'
import CategoryForm from './components/CategoryForm'

const AddCategory = ({ onClose, openModal }) => {
  const dispatch = useDispatch()
  const categoryStatus = useSelector(getStatusCategory)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
    navigate(`${pages.categoryListPath}`)
  }

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    try {
      dispatch(
        addCategory({
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
          isDeleted: false,
        })
      ).unwrap()
      setOpen(true)
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      {openModal && (
        <ModalCompo
          title="THÊM TÌNH TRẠNG"
          onClose={onClose}
          open={openModal}
          maxWidth="xl"
          divider={true}
        >
          <CategoryForm
            onFormSubmit={handleFormSubmit}
            isLoading={categoryStatus === 'loading'}
            onClose={onClose}
          />
        </ModalCompo>
      )}
      {open && (
        <ConfirmDialog
          open={open}
          handleClose={handleClose}
          desc="Thêm tình trạng thành công"
        />
      )}
    </React.Fragment>
  )
}

export default AddCategory
