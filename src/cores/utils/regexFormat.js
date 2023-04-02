export const phoneRegExp = /^(?:[0-9]{10})?$/;
export const passwordRegExp =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const regexFormat = {
  phoneRegExp,
  passwordRegExp,
  emailRegExp,
};

export default regexFormat;