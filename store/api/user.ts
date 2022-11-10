import create from "zustand";
import { IToken, IUser } from "../../types/base";
import createEmpty from "../../types/empty";

export interface UserRequest {
  user_id: string;
  password: string;
}

export interface UserResponse extends IUser {
  token: IToken;
}

type UserStatus = "pending" | "no_user" | "logged_in";

interface LoginStore {
  status: UserStatus;
  request: UserRequest;
  response: UserResponse;
  setRequest: (input: Partial<UserRequest>) => void;
  setStatus: (status: UserStatus) => void;
  login: (response: UserResponse) => void;
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
  setStatus: (status) => set({ status }),
  login: (response) => set({ status: "logged_in", response: response }),
  logout: set({ status: "no_user", response: initial.response }),
  test: () => set({ status: "logged_in" }),
}));

export const postLogin = async () => {
  // const { request: data, setStatus, login } = useUserStore.getState();
  // setStatus("pending");
  // try {
  //   const response = await axios.post<UserResponse>("/api/login", data);
  //   login(response.data);
  // } catch (e) {
  //   setStatus("no_user");
  //   console.log(e);
  // }
};
