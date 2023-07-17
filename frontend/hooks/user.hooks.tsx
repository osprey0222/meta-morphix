import { useMutation } from "react-query";
import { RegiaterUserPayload, registerUser } from "../services/user.services";
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
