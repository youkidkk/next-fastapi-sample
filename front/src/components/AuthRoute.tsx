import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../store/AuthState";

type AuthRouteProps = { children: ReactNode };

export default function AuthRoute({ children }: AuthRouteProps) {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!auth && !router.pathname.includes("/auth/")) {
      router.push("/auth/signin");
    }
  }, [router, auth]);
  return <>{children}</>;
}
