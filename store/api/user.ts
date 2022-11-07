import create from "zustand";
import { IToken, IUser } from "../../types/base";
import axios from "axios";
import createEmpty from "../../types/empty";

interface Request {
  user_id: string;
  password: string;
}

interface Response extends IUser {
  token: IToken;
}

interface LoginStore {
  status: "no_user" | "logged_in";
  request: Request;
  response: Response;
  setRequest: (input: Partial<Request>) => void;
  login: (response: Response) => void;
  logout: void;
  test: () => void;
}

const initial = {
  request: { user_id: "", password: "" },
  response: {
    ...createEmpty.user(),
    token: createEmpty.token(),
  },
};

export const useUserStore = create<LoginStore>()((set) => ({
  status: "no_user",
  request: initial.request,
  response: initial.response,
  setRequest: (request) =>
    set((state) => ({ request: { ...state.request, ...request } })),
  login: (response) => set({ status: "logged_in", response: response }),
  logout: set({ status: "no_user", response: initial.response }),
  test: () => set({ status: "logged_in" }),
}));

export const postLogin = async () => {
  const { request: data, login } = useUserStore.getState();
  try {
    const response = await axios.post<Request, Response>("/post", data);
    login(response);
  } catch (e) {
    console.log(e);
  }
};
