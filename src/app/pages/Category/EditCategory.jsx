import ModalCompo from 'app/components/ModalCompo'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getCategory,
  getStatusCategory,
  resetStatus,
} from '../../../cores/reducers/category'
import { editCategory, getCategoryDetail } from '../../../cores/thunk/category'
import ConfirmDialog from '../../components/Dialog/ConfirmDialog'
import pages from '../../config/pages'
import CategoryForm from './components/CategoryForm'

const EditCategory = ({ id, onClose, openModal }) => {
  const dispatch = useDispatch()
  const categoryStatus = useSelector(getStatusCategory)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const categoryDetail = useSelector(getCategory)
  const handleClose = () => {
    setOpen(false)
    navigate(`${pages.categoryListPath}`)
  }

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    try {
      dispatch(
        editCategory({
          categoryID: id,
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
        })
      ).unwrap()
      setOpen(true)
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  }

  useEffect(() => {
    if (categoryStatus === 'succeeded') {
      dispatch(resetStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getCategoryDetail(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      {openModal && (
        <ModalCompo
          title="SỬA TÌNH TRẠNG"
          onClose={onClose}
          open={openModal}
          maxWidth="xl"
          divider={true}
        >
          <CategoryForm
            onFormSubmit={handleFormSubmit}
            isLoading={categoryStatus === 'loading'}
            onClose={onClose}
            categoryDetail={{
              categoryName: categoryDetail?.categoryName,
              description: categoryDetail?.description,
              iconUrl: categoryDetail?.iconUrl,
            }}
          />
        </ModalCompo>
      )}
      {open && (
        <ConfirmDialog
          open={open}
          handleClose={handleClose}
          desc="Cập nhật tình trạng thành công"
        />
      )}
    </React.Fragment>
  )
}

export default EditCategory
