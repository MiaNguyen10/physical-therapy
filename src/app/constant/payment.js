import color from "./color";

const errorStatus = {
  status: "Unknown status",
};

export const shortTermStatuses = [
  {
    id: 0,
    color: color.error,
    status: "Chưa trả tiền",
  },
  {
    id: 1,
    color: color.success,
    status: "Đã thanh toán",
  },
  { id: 2, color: color.primary, status: "Tham gia" },
  {
    id: 3,
    color: color.secondary,
    status: "Đã hoàn thành",
  },
];

export const longTermStatuses = [
  {
    id: -1,
    color: color.warning,
    status: "Chưa đăng kí",
  },
  {
    id: 0,
    color: color.error,
    status: "Chưa trả tiền",
  },
  {
    id: 1,
    color: color.success,
    status: "Đã thanh toán",
  },
  { id: 2, color: color.primary, status: "Tham gia" },
  {
    id: 3,
    color: color.secondary,
    status: "Đã hoàn thành",
  },
];

export const getShortTermPaymentStatus = (toGetStatusId) => {
  const stat = shortTermStatuses.find(({ id }) => id === toGetStatusId);

  if (!stat) return errorStatus;

  return stat;
};

export const getLongTermPaymentStatus = (toGetStatusId) => {
  const stat = longTermStatuses.find(({ id }) => id === toGetStatusId);

  if (!stat) return errorStatus;

  return stat;
};
