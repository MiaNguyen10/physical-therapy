import ModalCompo from 'app/components/ModalCompo'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getStatusCategory } from '../../../cores/reducers/category'
import { addCategory } from '../../../cores/thunk/category'
import ConfirmDialog from '../../components/Dialog/ConfirmDialog'
import pages from '../../config/pages'
import CategoryForm from './components/CategoryForm'

const AddCategory = ({ onClose, openModal, setUnique }) => {
  const dispatch = useDispatch()
  const categoryStatus = useSelector(getStatusCategory)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    try {
      if (!iconUrl) {
        // Set a default value for iconUrl
        iconUrl = "https://firebasestorage.googleapis.com/v0/b/healthcaresystem-98b8d.appspot.com/o/icon%2Fcategory.png?alt=media&token=a19e1cae-4701-4cb4-bb3b-d62edd30007a";
      }
      dispatch(
        addCategory({
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
          isDeleted: false,
        })
      ).unwrap()
      setOpen(true)
      setUnique(Math.random());
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err)
    }
  }

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [categoryStatus]);

  const handleClose = () => {
    if (categoryStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.categoryListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addCategoryPath}`);
      setDesc("");
    }
  };

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
        desc={desc}
      />
      )}
    </React.Fragment>
  )
}

export default AddCategory
