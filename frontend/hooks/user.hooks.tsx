import { useMutation } from "react-query";
import {
  LoginUserPayload,
  RegiaterUserPayload,
  loginUser,
  registerUser,
} from "../services/user.services";
import { APIError } from "../types/common.types";

export const useRegisterUser = () => {
  return useMutation(
    ({
      payload,
      callback,
    }: {
      payload: RegiaterUserPayload;
      callback: (isSuccess: boolean, message: string) => void;
    }) => {
      return registerUser(payload);
    },

    {
      onSuccess(data, variables, context) {
        variables.callback(true, "");
      },
      onError(error: APIError, variables) {
        variables.callback(
          false,
          (error?.response?.data?.message as string) || "Something went wrong!"
        );
      },
    }
  );
};

export const useLoginUser = () => {
  return useMutation(
    ({
      payload,
      callback,
    }: {
      payload: LoginUserPayload;
      callback: (isSuccess: boolean, message: string, status?: number) => void;
    }) => {
      return loginUser(payload);
    },

    {
      onSuccess(data: LoginResponseData, variables, context) {
        variables.callback(true, "");
        localStorage.setItem("access_token", data.data.token);
      },
      onError(error: APIError, variables) {
        variables.callback(
          false,
          (error?.response?.data?.message as string) || "Something went wrong!",
          error?.response?.data?.status || 500
        );
      },
    }
  );
};

export const useLogoutUser = () => {
  localStorage.setItem("access_token", "");
};

interface LoginResponseData {
  data: {
    id: string;
    token: string;
  };
}
