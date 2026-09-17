export const fakeSendCode = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const fakeValidateCode = (email, code) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(code === "123456"), 1000)
  );
};
