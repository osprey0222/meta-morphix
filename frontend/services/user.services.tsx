import { POST } from "./apis/apis";
import { API_ROUTES } from "../constants/routes";

export const loginUser = (data: LoginUserPayload) => {
  const url = API_ROUTES.loginUser;
  return POST(url, { data });
};

export interface LoginUserPayload {
  email: string;
  password: string;
}

export const registerUser = (data: RegiaterUserPayload) => {
  const url = API_ROUTES.registerUser;
  return POST(url, { data: { ...data, dob: "1997-12-28" } });
};

export interface RegiaterUserPayload {
  fName: string;
  lName?: string;
  email: string;
  password: string;
}
