import { getSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { AssetsByCategory } from "@app/types/asset.ts";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_ASSET_BY_CATEGORY } from "@constants/queryKeys.ts";

const fetchAssetByCategory = async (user_id: string, date: string) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(
    `${DOMAIN}/asset/category-amount?userId=${user_id}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then<AssetsByCategory>(async (res) => {
    return res.json();
  });
};

export const useAssetsByCategory = (user_id: string, date: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_ASSET_BY_CATEGORY, user_id, date],
    queryFn: () => fetchAssetByCategory(user_id, date),
  });
};
