export interface FileDB {
  name: string;
  type: string;
  size: number;
  downloadURL: string;
  isLoading: boolean;
}

export interface FileDB_ extends FileDB {
  id: string;
}

export interface GetFilesResponse {
  data: FileDB_[];
}

export interface UploadFileResponse {
  data: FileDB_;
}

export interface DeleteFileResponse {
  data: FileDB_[];
}
