import { CheckSession } from "./Sessions";

export const isLoggedIn = () => {
  const result = CheckSession("isLogin");
  return JSON.parse(result);
};

export const userId = () => {
  const result = CheckSession("userId");
  return result;
};

export const userName = () => {
  const result = CheckSession("userName");
  return result;
};

export const avatar = () => {
  const result = CheckSession("avatar");
  return result;
};
