import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_USER } from "@constants/queryKeys.ts";
import { User } from "@app/types/auth.ts";
import { getCookie } from "@utils/storage.ts";
import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";

const fetchUser = async () => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/api/user/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<User>(async (res) => {
    if (!res.ok) {
      return {};
    }
    return res.json();
  });
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: [QUERY_KEY_USER],
    queryFn: fetchUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
