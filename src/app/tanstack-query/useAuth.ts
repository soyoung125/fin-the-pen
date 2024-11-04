import { SignIn, User } from "@app/types/auth.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteCookie, setCookie, setSessionStorage } from "@utils/storage.ts";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
  SESSION_STORAGE_KEY_REFRESH_TOKEN,
} from "@api/keys.ts";
import { useDispatch } from "react-redux";
import { QUERY_KEY_USER } from "@constants/queryKeys.ts";
import { setIsAuthenticatedFalse } from "@redux/slices/commonSlice.tsx";
import { PATH } from "@constants/path.ts";
import { useToast } from "@hooks/toast/useToast.tsx";

const fetchSignIn = async (credentials: SignIn) => {
  return fetch(`${DOMAIN}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { openToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: fetchSignIn,
    onSuccess: async (data, variable) => {
      const user: User | "" = await data.json();
      const accessToken = data.headers
        .get("Authorization")
        ?.split("Bearer ")[1];

      console.log(accessToken);
      if (user !== "") {
        const useUser: User = {
          name: user.name,
          user_id: variable.user_id?.toString() ?? "",
        };
        queryClient.setQueryData([QUERY_KEY_USER], useUser);
        setSessionStorage(SESSION_STORAGE_KEY_REFRESH_TOKEN, user.refreshToken);
        setCookie(COOKIE_KEY_REFRESH_TOKEN, user.refreshToken);
        setCookie(COOKIE_KEY_ACCESS_TOKEN, accessToken);
        navigate(PATH.home);
      } else {
        alert("로그인에 실패했습니다.");
      }
    },
    onError: () => {
      openToast({
        hideDuration: 4000,
        color: "error.light",
        toastText: "이메일 또는 비밀번호가 다릅니다.",
      });
    },
  });

  const signIn = (credentials: SignIn) => {
    mutate(credentials);
  };

  const signOut = () => {
    dispatch(setIsAuthenticatedFalse());
    queryClient.setQueryData([QUERY_KEY_USER], null);
    sessionStorage.clear();
    deleteCookie([COOKIE_KEY_REFRESH_TOKEN, COOKIE_KEY_ACCESS_TOKEN]);
  };

  return { signIn, signOut, isPending };
};
