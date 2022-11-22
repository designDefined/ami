export const localSuccessCode = "localAPISuccess" as const;
export const localEmptyCode = "localAPIEmptyData" as const;
export const localWrongKeyCode = "localAPIWrongKey" as const;

type SuccessCode = typeof localSuccessCode;
type ErrorCode = typeof localEmptyCode | typeof localWrongKeyCode;
type StatusCode = SuccessCode | ErrorCode;

const errorMessage = ["wrong localStorage key", "data is empty"] as const;

interface LocalResponseSuccess<T> {
  status: SuccessCode;
  data: T;
}

interface LocalResponseFail {
  status: ErrorCode;
  data: typeof errorMessage[number];
}

export type LocalResponse<T> = LocalResponseSuccess<T> | LocalResponseFail;

export const localSuccess = <T>(data: T): LocalResponseSuccess<T> => ({
  status: localSuccessCode,
  data,
});

export const localEmptyData = (): LocalResponseFail => ({
  status: localEmptyCode,
  data: "data is empty",
});

export const localWrongKey = (): LocalResponseFail => ({
  status: localWrongKeyCode,
  data: "wrong localStorage key",
});
