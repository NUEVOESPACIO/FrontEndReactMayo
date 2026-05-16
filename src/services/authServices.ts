import { loginRequest } from "../api/authApi";

export const login = async (
  username: string,
  password: string
) => {

  return loginRequest({
    username,
    password,
  });
};