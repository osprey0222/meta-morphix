import axios, { AxiosHeaders } from "axios";

const test_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzU2YzJlZTUyNGUzMDNmOTMzODgyNCIsImlhdCI6MTY5MDY2MDgwNCwiZXhwIjoxNjkzMjUyODA0fQ.v_dS9SacBEVh6atQQIbhoIYQNOrQXR7YXPGRj5GPdd0";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${test_token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  withCredentials: false,
});

export function GET<Params, Response>(
  url: string,
  params?: Params,
  headers?: AxiosHeaders
): Promise<Response> {
  return axiosInstance.get(url, { params, headers }).then((res) => res.data);
}

export function POST<Payload, Response>(
  url: string,
  data: Payload,
  headers?: AxiosHeaders
): Promise<Response> {
  return axiosInstance.post(url, data, { headers }).then((res) => res.data);
}

export function PATCH<Payload, Response>(
  url: string,
  data: Payload,
  headers?: AxiosHeaders
): Promise<Response> {
  return axiosInstance.patch(url, data, { headers }).then((res) => res.data);
}

export function DELETE<Payload, Response>(
  url: string,
  headers?: AxiosHeaders
): Promise<Response> {
  return axiosInstance.delete(url, { headers }).then((res) => res.data);
}
