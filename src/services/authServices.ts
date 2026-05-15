import { loginRequest } from "../api/authApi";

export const login = async (
  username: string,
  password: string
) => {

  const data = await loginRequest({
    username,
    password,
  });

  localStorage.setItem("token", data.token);

  return data;
};