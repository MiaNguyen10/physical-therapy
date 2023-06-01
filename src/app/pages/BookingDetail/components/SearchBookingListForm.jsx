import { Button, MenuItem, Stack, TextField } from "@mui/material";
import DatePickerInput from "app/components/Input/DatePicker";
import {
  STATUS_ALL,
  ALL_TYPE_OF_SLOT,
  TypeOfSLotList,
} from "app/constant/bookingDetail";
import { paymentStatuses } from "app/constant/payment";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SearchBookingListForm = ({
  onSearch,
  rangeDate,
  setRangeDate,
  setUnique,
}) => {
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      status: STATUS_ALL,
      typeOfSlot: ALL_TYPE_OF_SLOT,
    },
  });
  const styles = makeStyles();
  const [statusState, setStatusState] = useState(-1);
  const [typeOfSlotState, setTypeOfSlotState] = useState(-1);

  const handleStartDateChange = (value) => {
    if (value.toString() !== "Invalid Date")
      setRangeDate((prev) => ({ ...prev, startDate: value }));
    else setRangeDate((prev) => ({ ...prev, startDate: null }));
  };

  const handleEndDateChange = (value) => {
    if (value.toString() !== "Invalid Date")
      setRangeDate((prev) => ({ ...prev, endDate: value }));
    else setRangeDate((prev) => ({ ...prev, endDate: null }));
  };

  const onSubmit = (data) => {
    onSearch(data);
    setUnique(Math.random());
  };

  const handleSelectStatus = (status) => {
    setStatusState(status);
    onSearch({ status, typeOfSlot: typeOfSlotState });
  };

  const handleSelectTypeOfSlot = (typeOfSlot) => {
    setTypeOfSlotState(typeOfSlot);
    onSearch({ typeOfSlot, status: statusState });
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction='row'
      component='form'
      alignItems='center'
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <DatePickerInput
        disablePast={false}
        disabled={false}
        label='Từ ngày'
        value={rangeDate.startDate ?? ""}
        onChange={handleStartDateChange}
        sx={undefined}
        error={undefined}
      />
      <DatePickerInput
        disablePast={false}
        disabled={false}
        label='Đến ngày'
        value={rangeDate.endDate ?? ""}
        onChange={handleEndDateChange}
        sx={undefined}
        error={undefined}
      />
      <Controller
        control={control}
        name='status'
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "180px",
              }}
              select
              onChange={(val) => {
                const itemValue = val.target.value;
                onChange(itemValue);
                handleSelectStatus(itemValue);
              }}
              value={value}
              variant='outlined'
              label='Trạng thái'
            >
              <MenuItem value={STATUS_ALL} onClick={handleSelectStatus}>
                Tất cả
              </MenuItem>
              {paymentStatuses.map(({ id, status }) => (
                <MenuItem value={id} key={status} onClick={handleSelectStatus}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
      <Controller
        control={control}
        name='typeOfSlot'
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "180px",
              }}
              select
              onChange={(val) => {
                const itemValue = val.target.value;
                onChange(itemValue);
                handleSelectTypeOfSlot(itemValue);
              }}
              value={value}
              variant='outlined'
              label='Loại trị liệu'
            >
              <MenuItem value={ALL_TYPE_OF_SLOT}>Tất cả</MenuItem>
              {TypeOfSLotList.map(({ id, slot }) => (
                <MenuItem value={id} key={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
      <Button
        type='submit'
        variant='outlined'
        sx={{
          height: "45px",
          width: "80px",
          fontWeight: "bold",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          fontSize: "1.2rem", // change this value to increase or decrease the font size
          padding: "10px 32px", // change this value to increase or decrease the padding
          border: "2px solid",
        }}
      >
        Tìm
      </Button>
    </Stack>
  );
};

export default SearchBookingListForm;
