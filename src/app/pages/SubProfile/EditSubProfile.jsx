import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/subProfile";
import { editSubProfile } from "../../../cores/thunk/subProfile";
import SubProfileForm from "./components/SubProfileForm";

const EditSubProfile = () => {
  const { id, idDetail } = useParams();
  const dispatch = useDispatch();
  const subProfileStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.subProfile.error);

  const [subProfile, setSubProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/${idDetail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setSubProfile(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleEditFormSubmit = ({ relationName, set, description }) => {
    try {
      const excerciseDetail = {
        subProfileID: idDetail,
        relationName: relationName,
        description: description,
        userID: id,
        set: set,
      };
      dispatch(
        editSubProfile({
          excerciseDetail,
          token,
        })
      ).unwrap();
      setSubProfile(excerciseDetail)
      setOpen(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (!err) {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/user/${id}/subProfileList/${idDetail}/edit`);
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA CHI TIẾT MỐI QUAN HỆ</Typography>

        <SubProfileForm
          subProfile={{
            relationName: subProfile?.relationName,
            set: subProfile?.set,
            description: subProfile?.description,
          }}
          onFormSubmit={handleEditFormSubmit}
          isLoading={subProfileStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditSubProfile;
