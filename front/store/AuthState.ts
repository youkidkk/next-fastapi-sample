import { atom } from "recoil";

type AuthInfo = {
  userName: string;
  accessToken: string;
};

export const authState = atom<AuthInfo | undefined>({
  key: "auth",
  default: undefined,
});
