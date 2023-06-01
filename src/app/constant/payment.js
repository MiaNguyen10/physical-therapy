import color from "./color";

const errorStatus = {
  status: "Unknown status",
};

export const paymentStatuses = [
  {
    id: 0,
    color: color.error,
    status: "Chưa thanh toán",
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
  {
    id: 4,
    color: color.warning,
    status: "Y/C đăng kí dài hạn",
  },
  {
    id: 5,
    color: color.error,
    status: "Thanh toán thất bại",
  },
];

export const getPaymentStatus = (toGetStatusId) => {
  const stat = paymentStatuses.find(({ id }) => id === toGetStatusId);

  if (!stat) return errorStatus;

  return stat;
};
