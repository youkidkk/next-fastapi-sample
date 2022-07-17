import { AlertColor } from "@mui/material";
import { atom } from "recoil";

type MessageStateType = {
  text: string;
  severity: AlertColor;
};

export const messageState = atom<MessageStateType | undefined>({
  key: "message",
  default: undefined,
});
