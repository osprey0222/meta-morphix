import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";
import { DateISO } from "../types/dayPlanner.types";
import { getQuickNote, updateQuickNote } from "../services/quickNote.services";
import { UpdateQNPayload } from "../types/quickNote.types";
import {
  deleteFile,
  getAllFiles,
  uploadFile,
} from "../services/files.services";
import { FileDB_ } from "../types/files.types";

export const useGetAllFiles = () => {
  return useQuery([QUERY_KEYS.GET_ALL_FILES], () => getAllFiles(), {
    placeholderData: [],
  });
};

export const useDeleteFile = () => {
  const { refetch } = useGetAllFiles();
  return useMutation(
    ({ fileId, callback }: { fileId: string; callback?: () => void }) =>
      deleteFile(fileId),
    {
      onSuccess: (data, variables) => {
        refetch();
      },
      onError: (data, variables) => {},
    }
  );
};

export const useUploadFile = () => {
  const { refetch } = useGetAllFiles();
  return useMutation(
    ({ payload, callback }: { payload: any; callback?: (p: string) => void }) =>
      uploadFile(payload),
    {
      onSuccess: (data, variables) => {
        refetch();
      },
      onError: (data, variables) => {},
    }
  );
};
