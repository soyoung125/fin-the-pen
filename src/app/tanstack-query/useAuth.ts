import { SignIn, User } from "@app/types/auth.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import { setSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { useDispatch } from "react-redux";
import { QUERY_KEY_USER } from "@constants/queryKeys.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { setIsAuthenticatedFalse } from "@redux/slices/commonSlice.tsx";

const fetchSignIn = async (credentials: SignIn) => {
  return fetch(`${DOMAIN}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

// TODO: 추후에 토큰 방식으로 수정 예정입니다. 지금은 기존 구조로 진행합니다.
const generateRandomToken = () => {
  const randomEightDigit = Math.floor(
    10000000 + Math.random() * 90000000
  ).toString();
  setSessionStorage(SESSION_STORAGE_KEY_TOKEN, randomEightDigit);
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAlert } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: fetchSignIn,
    onSuccess: async (data, variable) => {
      const user: User | "" = await data.json();
      if (user !== "") {
        const useUser: User = {
          name: user.name,
          user_id: variable.user_id?.toString() ?? "",
        };
        queryClient.setQueryData([QUERY_KEY_USER], useUser);
        setSessionStorage(SESSION_STORAGE_KEY_TOKEN, user.token);
        navigate("//");
      } else {
        alert("로그인에 실패했습니다.");
      }
    },
  });

  const signIn = (credentials: SignIn) => {
    mutate(credentials);
  };

  const signOut = () => {
    dispatch(setIsAuthenticatedFalse());
    queryClient.removeQueries({ queryKey: [QUERY_KEY_USER] });
    sessionStorage.clear();
  };

  const mockSignIn = async () => {
    await openAlert({
      title: "로그인",
      content: "게스트 모드로 로그인 합니다.",
      approveText: "확인",
    });
    generateRandomToken();
    queryClient.setQueryData([QUERY_KEY_USER], {
      id: 0,
      user_id: "guest@finthepen.com",
      name: "guest by msw",
      // bday: "2000-01-01",
      // registerDate: "2023-01-25T14:57:08.023+00:00",
      // phone_number: "010-4413-5698",
    });
    navigate(PATH.home);
  };

  return { signIn, signOut, isPending, mockSignIn };
};
