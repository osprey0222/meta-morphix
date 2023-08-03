import { GET, POST } from "./apis/apis";
import { API_ROUTES } from "../constants/routes";
import { generateUrl } from "../utils/common";

export const verifyUser = (data: VerifyUserPayload) => {
  const url = generateUrl(API_ROUTES.verifyUser, { ...data });
  return GET(url).then((res) => res);
};

export interface VerifyUserPayload {
  email: string;
  code: string;
}

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
