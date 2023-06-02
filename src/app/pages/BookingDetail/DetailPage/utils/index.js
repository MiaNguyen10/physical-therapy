const dateOtpns = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const getDate = (date) => {
  const time = new Date(date);

  return time.toLocaleString("vi", dateOtpns);
};
