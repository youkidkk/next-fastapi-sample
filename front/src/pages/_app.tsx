import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import AuthRoute from "../components/AuthRoute";
import MessageSnackBar from "../components/MessageSnackBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthRoute>
        <MessageSnackBar />
        <Component {...pageProps} />
      </AuthRoute>
    </RecoilRoot>
  );
}

export default MyApp;
