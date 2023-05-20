import {
  Box,
  Card,
  CardContent,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import {
  getAllFeedback,
  getFeedbackStatus,
  resetStatus,
} from "cores/reducers/feedback";
import { getFeedbackList } from "cores/thunk/feedback";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeedbackList = () => {
  const dispatch = useDispatch();
  const feedbackList = useSelector(getAllFeedback);
  const status = useSelector(getFeedbackStatus);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getFeedbackList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Typography variant="h3" textAlign="center" sx={{ m: 5 }}>
        PHẢN HỒI CỦA NGƯỜI DÙNG
      </Typography>
      <Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}
          sx={{ float: "left", mt: 8 }}
        >
          {feedbackList
            ? feedbackList.map((feedback) => (
                <Card key={feedback.feedbackID}>
                  <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">
                      {feedback.schedule.slot.slotName}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Loại điều trị: {feedback.schedule.typeOfSlot.typeName}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Thời gian:{" "}
                      {dayjs(feedback.schedule.slot.timeStart).format(
                        "DD/MM/YYYY HH:mm A "
                      )}{" "}
                      -{" "}
                      {dayjs(feedback.schedule.slot.timeEnd).format(
                        "DD/MM/YYYY HH:mm A"
                      )}
                    </Typography>
                    {/* <Typography variant="body2" gutterBottom>
                      Schedule: {feedback.schedule.description}
                    </Typography> */}
                    <Typography variant="body2" gutterBottom>
                      Chuyên viên vật lý trị liệu:{" "}
                      {`${feedback.schedule.physiotherapistDetail.user.lastName} ${feedback.schedule.physiotherapistDetail.user.firstName}`}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Đánh giá: {feedback.comment}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Rating star:{" "}
                    </Typography>
                    <Rating value={feedback.ratingStar} readOnly />
                  </CardContent>
                </Card>
              ))
            : null}
        </Stack>
      </Box>
    </Container>
  );
};

export default FeedbackList;
