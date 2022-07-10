import { AlertColor } from "@mui/material";
import { atom } from "recoil";

type MessageStateType = {
  open: boolean;
  text?: string;
  severity?: AlertColor;
};

export const messageState = atom<MessageStateType>({
  key: "message",
  default: {
    open: false,
    text: undefined,
    severity: undefined,
  },
});
