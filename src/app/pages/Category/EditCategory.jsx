import ModalCompo from "app/components/ModalCompo";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategory,
  getStatusCategory,
  resetStatus,
} from "../../../cores/reducers/category";
import { editCategory, getCategoryDetail } from "../../../cores/thunk/category";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import CategoryForm from "./components/CategoryForm";

const EditCategory = ({ id, onClose, openModal, setUnique }) => {
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatusCategory);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const categoryDetail = useSelector(getCategory);
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");
  const err = useSelector(state => state.category.error)

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    if (!iconUrl) {
      // Set a default value for iconUrl
      iconUrl = "https://firebasestorage.googleapis.com/v0/b/healthcaresystem-98b8d.appspot.com/o/icon%2Fcategory.png?alt=media&token=a19e1cae-4701-4cb4-bb3b-d62edd30007a";
    }
    try {
      dispatch(
        editCategory({
          categoryID: id,
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
        })
      ).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
      setOpen(true);
      setUnique(Math.random());
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (!err) {
      setDesc("Cập nhật thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    // if (categoryStatus === "succeeded") {
    //   setOpen(false);
    //   navigate(`${pages.categoryListPath}`);
    // } else {
    //   setOpen(false);
    //   navigate(`/category/${id}/edit`);
    //   setDesc("");
    // }
    setOpen(false);
    navigate(`/category/${id}/edit`);
  };

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
            isLoading={categoryStatus === "loading"}
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
        <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
      )}
    </React.Fragment>
  );
};

export default EditCategory;
