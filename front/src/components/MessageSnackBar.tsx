import { Alert, Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { messageState } from "../store/MessageState";

export default function MessageSnackBar() {
  const [message, setMessage] = useRecoilState(messageState);
  const onClose = () => {
    setMessage(undefined);
  };
  if (!message) {
    return <></>;
  }
  return (
    <Snackbar
      open={true}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      message={message.text}
    >
      <Alert severity={message.severity}>{message.text}</Alert>
    </Snackbar>
  );
}
