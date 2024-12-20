import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import { getUserStatus } from "cores/reducers/user";
import { editUser } from "cores/thunk/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AccountForm from "./components/AccountForm";

const EditAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const status = useSelector(getUserStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const error = useSelector((state) => state.user.error);

  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/User/getById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setUserDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (error) {
      setOpen(false);
      navigate(`/user/${id}/edit`);
    } else {
      setOpen(false);
      navigate(`/user`);
    }
  };

  const handleFormSubmit = ({
    email,
    firstName,
    address,
    image,
    dob,
    phoneNumber,
    gender,
  }) => {
    const user = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: "",
      address: address,
      image: image,
      dob: dob,
      phoneNumber: phoneNumber,
      gender: gender === "Nam" ? true : false,
      bookingStatus: true,
    };
    try {
      dispatch(editUser({ user, token })).unwrap();
      setUserDetail(user);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (!error) {
      setDesc("Cập nhật thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [error]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">CHI TIẾT TÀI KHOẢN</Typography>
        <AccountForm
          userDetail={{
            //lastName: userDetail?.lastName,
            firstName: userDetail?.firstName,
            email: userDetail?.email,
            phoneNumber: userDetail?.phoneNumber,
            address: userDetail?.address,
            dob: userDetail?.dob,
            image: userDetail?.image,
            role: userDetail?.role,
            gender: userDetail?.gender === true ? "Nam" : "Nữ",
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditAccount;

// //* New code

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Container, Stack, Typography } from "@mui/material";
// import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
// import { selectToken, selectUserId } from "cores/reducers/authentication"; // Assuming you have a selector to get the user ID
// import { getUserStatus } from "cores/reducers/user";
// import { editUser } from "cores/thunk/user";
// import AccountForm from "./components/AccountForm";

// const EditAccount = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const token = useSelector(selectToken);
//   const status = useSelector(getUserStatus);
//   const currentUserId = useSelector(selectUserId);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [desc, setDesc] = useState("");
//   const error = useSelector((state) => state.user.error);

//   const [userDetail, setUserDetail] = useState(null);
//   const handleFormSubmit = ({
//     email,
//     firstName,
//     address,
//     image,
//     dob,
//     phoneNumber,
//     gender,
//   }) => {
//     if (currentUserId !== id) {
//       // Current user is not authorized to edit this ID
//       return;
//     }

//     const user = {
//       id: id,
//       email: email,
//       firstName: firstName,
//       lastName: "",
//       address: address,
//       image: image,
//       dob: dob,
//       phoneNumber: phoneNumber,
//       gender: gender === "Nam" ? true : false,
//       bookingStatus: true,
//     };

//     try {
//       dispatch(editUser({ user, token })).unwrap();
//       setUserDetail(user);
//       setOpen(true);
//     } catch (err) {
//       // eslint-disable-next-line no-empty
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_ENDPOINT}/User/getById/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const jsonData = await response.json();
//         setUserDetail(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (currentUserId !== id) {
//       navigate(`/user`); // Redirect unauthorized user
//       return;
//     }

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClose = () => {
//     if (error) {
//       setOpen(false);
//       navigate(`/user/${id}/edit`);
//     } else {
//       setOpen(false);
//       navigate(`/user`);
//     }
//   };

//   useEffect(() => {
//     if (!error) {
//       setDesc("Cập nhật thông tin thành công");
//     } else {
//       setDesc("Lỗi, vui lòng nhập lại");
//     }
//   }, [error]);

//   return (
//     <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
//       <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
//         <Typography variant="h3">CHI TIẾT TÀI KHOẢN</Typography>
//         <AccountForm
//           userDetail={{
//             //lastName: userDetail?.lastName,
//             firstName: userDetail?.firstName,
//             email: userDetail?.email,
//             phoneNumber: userDetail?.phoneNumber,
//             address: userDetail?.address,
//             dob: userDetail?.dob,
//             image: userDetail?.image,
//             role: userDetail?.role,
//             gender: userDetail?.gender === true ? "Nam" : "Nữ",
//           }}
//           onFormSubmit={handleFormSubmit}
//           isLoading={status === "loading"}
//         />
//       </Stack>
//       <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
//     </Container>
//   );
// };

// export default EditAccount;
