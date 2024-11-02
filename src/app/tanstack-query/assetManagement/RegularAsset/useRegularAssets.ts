import { getCookie, getSessionStorage } from "@utils/storage.ts";
import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { RegularAssetsRequest } from "@app/types/asset.ts";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_REGULAR_ASSET } from "@constants/queryKeys.ts";
import { Schedule } from "@app/types/schedule.ts";

const fetchRegularAssets = async (query: RegularAssetsRequest) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/period-amount/view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<Schedule[]>(async (res) => {
    const response = await res.json();
    return response.data;
  });
};

export const useRegularAssets = (data: RegularAssetsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY_REGULAR_ASSET],
    queryFn: () => fetchRegularAssets(data),
  });
};
