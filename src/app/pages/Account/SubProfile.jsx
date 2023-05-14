import { Button, Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getSubProfileStatus } from "cores/reducers/subProfile";
import { editSubProfile } from "cores/thunk/subProfile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import SubProfileForm from "./components/SubProfileForm";

const SubProfile = () => {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const status = useSelector(getSubProfileStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const error = useSelector(state => state.subProfile.error)

  const [subProfileDetail, setSubProfileDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/GetByUserID?userID=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setSubProfileDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = ({ relationId, subName }) => {
    try {
      const input = {
        userID: id,
        relationId: relationId,
        subName: subName,
        isDeleted: false,
      };
      dispatch(editSubProfile({ input, token })).unwrap();
      setSubProfileDetail(input)
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (!error) {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/user/${id}/subProfiletherapist`);
  };

  return subProfileDetail === {} ? (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h5">
          Chưa có thông tin thêm của người dùng
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(`/user/${id}/subProfiletherapist/add`)}
        >
          Thêm thông tin
        </Button>
      </Stack>
    </Container>
  ) : (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÔNG TIN NGƯỜI DÙNG</Typography>
        <SubProfileForm
          subProfileDetail={{
            subName: subProfileDetail?.subName,
            relationId: subProfileDetail?.relationId,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
          id={id}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default SubProfile;
