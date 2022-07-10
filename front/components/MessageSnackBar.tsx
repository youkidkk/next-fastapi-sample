import { Alert, Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { messageState } from "../store/message-state";

export default function MessageSnackBar() {
  const [message, setMessage] = useRecoilState(messageState);
  const onClose = () => {
    setMessage({ open: false, text: undefined, severity: undefined });
  };
  return (
    <Snackbar
      open={message.open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      message={message.text}
    >
      <Alert severity={message.severity ?? "success"}>{message.text}</Alert>
    </Snackbar>
  );
}
