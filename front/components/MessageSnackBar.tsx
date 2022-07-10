import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { messageState } from "../store/message-state";

export default function MessageSnackBar() {
  const [message, setMessage] = useRecoilState(messageState);
  const open = message.text !== "";
  const onClose = () => {
    setMessage({ text: "" });
  };
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      message={message.text}
    />
  );
}
