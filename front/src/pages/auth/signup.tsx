import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as MuiLink } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { messageState } from "../../store/MessageState";

type Inputs = {
  username: string;
  password: string;
  retypePassword: string;
};

const theme = createTheme();

export default function SignUp() {
  const [message, setMessage] = useRecoilState(messageState);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if (values.password !== values.retypePassword) {
      setMessage({
        text: "パスワードを再入力してください。",
        severity: "warning",
      });
      return;
    }
    const url = "http://127.0.0.1:8000/api/auth/signup";
    try {
      const data = new FormData();
      data.append("username", values.username);
      data.append("password", values.password);
      const res = await axios.post(url, data);
      setMessage({
        text: "登録しました。",
        severity: "success",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response;
        console.log(res);
        setMessage({
          text: error.response?.data?.detail,
          severity: "warning",
        });
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            サインアップ
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ユーザー名"
                  {...register("username")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="パスワード"
                  type="password"
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="パスワード（再入力）"
                  type="password"
                  {...register("retypePassword")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              サインアップ
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink variant="body2">
                  <Link href="signin">サインイン</Link>
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
