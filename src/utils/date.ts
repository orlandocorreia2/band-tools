import { DaysOfWeek } from "../types";

export const getDate = (date?: Date) => {
  if (date) return date;
  return getTimezone(new Date());
};

export const getTimezone = (date: Date) => {
  date.setHours(date.getHours() - 3);
  return date;
};

export const dateString = (value: Date) => {
  try {
    return value.toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};

export const hourString = (value: Date) => {
  try {
    return value.toISOString().split("T")[1].split(".")[0];
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
