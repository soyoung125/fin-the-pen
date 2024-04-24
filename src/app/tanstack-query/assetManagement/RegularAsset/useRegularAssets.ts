import { getSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import {
  AssetsByCategory,
  RegularAssets,
  RegularAssetsRequest,
} from "@app/types/asset.ts";
import { useQuery } from "@tanstack/react-query";
import {
  QUERY_KEY_ASSET_BY_CATEGORY,
  QUERY_KEY_REGULAR_ASSET,
} from "@constants/queryKeys.ts";
import { INIT_ASSET_BY_CATEGORY } from "@app/tanstack-query/assetManagement/AssetByCategory/utils.ts";
import { Schedule } from "@app/types/schedule.ts";

const fetchRegularAssets = async (query: RegularAssetsRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

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
    queryKey: [
      QUERY_KEY_REGULAR_ASSET,
      data.user_id,
      data.start_date,
      data.end_date,
    ],
    queryFn: () => fetchRegularAssets(data),
  });
};
