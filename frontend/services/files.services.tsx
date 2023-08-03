import axios from "axios";
import { API_ROUTES } from "../constants/routes";
import {
  DeleteFileResponse,
  GetFilesResponse,
  UploadFileResponse,
} from "../types/files.types";
import {
  GetQNResponse,
  UpdateQNPayload,
  UpdateQNResponse,
} from "../types/quickNote.types";
import { generateUrl } from "../utils/common";
import { DELETE, GET, PATCH, POST } from "./apis/apis";

export const handleDownload = (url: string, filename?: string) => {
  const link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getAllFiles = () => {
  const url = API_ROUTES.getFiles;
  return GET<undefined, GetFilesResponse>(url).then((data) => data.data);
};

export const uploadFile = (payload: any) => {
  return POST<undefined, UploadFileResponse>(
    API_ROUTES.uploadFile,
    payload
  ).then((data) => data.data);
};

export const deleteFile = (fileId: string) => {
  const url = generateUrl(API_ROUTES.deleteFile, { fileId });
  return DELETE<undefined, DeleteFileResponse>(url).then((data) => data.data);
};
