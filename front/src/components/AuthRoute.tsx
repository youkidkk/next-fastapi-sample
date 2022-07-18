import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../store/AuthState";

type AuthRouteProps = { children: ReactNode };

export default function AuthRoute({ children }: AuthRouteProps) {
  const auth = useRecoilValue(authState);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes("/auth/")) {
      return;
    }
    if (!auth && router.isReady) {
      router.push("/auth/signin");
    }
  }, [router, auth]);
  if (router.pathname.includes("/auth/")) {
    return <>{children}</>;
  }
  if (!auth) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return children;
}
