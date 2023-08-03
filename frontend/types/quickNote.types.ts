export interface GetQNResponse {
  data: { [key: string]: string };
}

export interface UpdateQNPayload {
  data: { quickNote: string };
}

export interface UpdateQNResponse {
  data: string;
}
