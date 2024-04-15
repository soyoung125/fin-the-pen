import useAssetByCategory from "@hooks/assetManagement/useAssetByCategory.ts";

function AssetByCategory() {
  const { assetsByCategory } = useAssetByCategory();
  console.log(assetsByCategory);
  return <></>;
}

export default AssetByCategory;
