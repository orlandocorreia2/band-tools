import { DaysOfWeek } from "../types";

const options = { timeZone: "America/Sao_Paulo" };

export const now = () => {
  return new Date();
};

export const nowTimeZone = () => {
  const date = new Date();
  date.setHours(date.getHours() - 3);
  return date;
};

export const dateTimeZone = (value: Date) => {
  return new Date();
};

export const formatHour = (value: Date) => {
  try {
    return `${value.getHours().toString().padStart(2, "0")}:${value
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    return "";
  }
};

export const formatDatePtBr = (value: Date) => {
  try {
    return value.toISOString().split("T")[0].split("-").reverse().join("/");
  } catch (error) {
    return "";
  }
};

export const dayOfWeekByDate = (value: Date): DaysOfWeek => {
  const daysOfWeek: { [key: number]: DaysOfWeek } = {
    0: "monday",
    1: "sunday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };
  return daysOfWeek[value.getUTCDay()];
};
