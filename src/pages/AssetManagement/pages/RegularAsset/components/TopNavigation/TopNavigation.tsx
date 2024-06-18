import { HeaderContainer } from "@components/TemplateDrawer/components/Header/Header.styles.ts";
import BackButton from "@components/layouts/common/TopBar/buttons/BackButton.tsx";
import useAsset from "@hooks/assetManagement/useAsset.ts";
import assetManagements from "@constants/managements.ts";
import SelectAssetMenu from "@components/layouts/common/TopBar/SelectAssetMenu";

function TopNavigation() {
  const { assetMenu, setMenu } = useAsset();

  return (
    <HeaderContainer>
      <BackButton />

      <SelectAssetMenu
        selectedOption={assetMenu}
        setSelectedOption={setMenu}
        options={assetManagements.map((a) => a.title)}
      />
    </HeaderContainer>
  );
}

export default TopNavigation;
