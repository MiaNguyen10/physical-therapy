export const STATUS_ALL = -1;
export const ALL_TYPE_OF_SLOT = -1;

export const shortTermID = 1;
export const longTermID = 0;

export const TypeOfSLotList = [
  { id: longTermID, slot: "Dài hạn" },
  { id: shortTermID, slot: "Ngắn hạn" },
];

export const getTypeOfSlot = (toGetSlotID) => {
  const slot = TypeOfSLotList.find(({ id }) => {
    return id === toGetSlotID;
  });
  if (!slot) return { slot: "Unknown Error" };

  return slot;
};
