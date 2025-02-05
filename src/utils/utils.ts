export const sleep = (timeInSeconds = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeInSeconds * 1000);
  });
};
