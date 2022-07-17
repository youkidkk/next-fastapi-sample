import { atom } from "recoil";

type AuthStateType = {
  userName: string;
  accessToken: string;
};

export const authState = atom<AuthStateType | undefined>({
  key: "auth",
  default: undefined,
});
