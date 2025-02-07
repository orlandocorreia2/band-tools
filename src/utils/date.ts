export const now = () => {
  return new Date();
};

export const formatHour = (value: Date) => {
  try {
    const options = { timeZone: "America/Sao_Paulo" };
    return value.toLocaleString("pt-BR", options).split(",")[1];
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
