import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../../styles/globals.css";
import AuthRoute from "../components/AuthRoute";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthRoute>
        <Component {...pageProps} />
      </AuthRoute>
    </RecoilRoot>
  );
}

export default MyApp;
