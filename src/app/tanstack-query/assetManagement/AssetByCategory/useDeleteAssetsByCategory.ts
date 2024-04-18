import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { QUERY_KEY_ASSET_BY_CATEGORY } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PropsInterface {
  user_id: string;
  date: string;
}

const fetchDeleteAssetsByCategory = async ({
  user_id,
  date,
}: PropsInterface) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(
    `${DOMAIN}/asset/category-amount/delete?userId=${user_id}&date=${date}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const useDeleteAssetsByCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchDeleteAssetsByCategory,
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

  const deleteAssetsByCategory = (user_id: string, date: string) => {
    mutate({ user_id, date });
  };

  return { deleteAssetsByCategory };
};
