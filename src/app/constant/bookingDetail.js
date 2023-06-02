import colors from "./color";

export const STATUS_ALL = -1;
export const ALL_TYPE_OF_SLOT = -1;

export const shortTermID = 0;
export const longTermID = 1;

export const TypeOfSLotList = [
  { id: shortTermID, slot: "Tư vấn", color: colors.pastelGreen },
  { id: longTermID, slot: "Dài hạn", color: colors.pastelYellow },
];

export const getTypeOfSlot = (toGetSlotID) => {
  const slot = TypeOfSLotList.find(({ id }) => {
    return id === toGetSlotID;
  });
  if (!slot) return { slot: "Chưa xác định", color: "black" };

  return slot;
};
