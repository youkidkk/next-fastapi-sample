import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import MessageSnackBar from "../../components/MessageSnackBar";
import { authState } from "../../store/AuthState";
import { messageState } from "../../store/MessageState";

type Inputs = {
  username: string;
  password: string;
};

const theme = createTheme();

export default function SignIn() {
  const [message, setMessage] = useRecoilState(messageState);
  const [auth, setAuth] = useRecoilState(authState);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const url = "http://localhost:8000/api/auth/signin";
    try {
      const data = new FormData();
      data.append("username", values.username);
      data.append("password", values.password);
      const res = await axios.post(url, data);
      console.log(res);
      if (res.status != 200) {
        setMessage({
          open: true,
          text: "エラー" + res,
          severity: "warning",
        });
      } else {
        setAuth({
          userName: values.username,
          accessToken: res.data.access_token,
        });
        setMessage({
          open: true,
          text: res?.status.toString(),
          severity: "success",
        });
      }
    } catch (error) {
      setMessage({
        open: true,
        text: "エラー" + error,
        severity: "warning",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <MessageSnackBar />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            サインイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="ユーザー名"
              autoFocus
              {...register("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="パスワード"
              type="password"
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              サインイン
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"サインアップ"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
