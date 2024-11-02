import {
  COOKIE_KEY_ACCESS_TOKEN,
  SESSION_STORAGE_KEY_REFRESH_TOKEN,
} from "@api/keys";
import { DOMAIN } from "@api/url";
import { getCookie, getSessionStorage } from "@app/utils/storage";
import { QUERY_KEY_ASSET_BY_CATEGORY } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAssetByCategory } from "@app/types/asset.ts";

const fetchSetAssetByCategory = async (query: setAssetByCategory) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN); //getSessionStorage(SESSION_STORAGE_KEY_REFRESH_TOKEN, "");

  return fetch(`${DOMAIN}/asset/category-amount/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useSetAssetsByCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchSetAssetByCategory,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY_ASSET_BY_CATEGORY,
          variables.user_id,
          variables.date,
        ],
      });
    },
  });

  const SetAssetsByCategory = (query: setAssetByCategory) => {
    mutate(query);
  };

  return { SetAssetsByCategory };
};
