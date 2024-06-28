import { Stack } from "@mui/material";
import PersonalButton from "../buttons/PersonalButton.tsx";
import SelectAssetMenu from "@components/layouts/common/TopBar/SelectAssetMenu";
import useAsset from "@hooks/assetManagement/useAsset.ts";
import assetManagements from "@constants/managements.ts";
import BackButton from "@components/layouts/common/TopBar/buttons/BackButton.tsx";

function AssetMode() {
  const { assetMenu, setMenu } = useAsset();

  if (assetMenu !== 3) {
    return (
      <>
        {/* 헤더 좌측 메뉴 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />
        </Stack>

        {/* 헤더 중앙 메뉴 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SelectAssetMenu
            selectedOption={assetMenu}
            setSelectedOption={setMenu}
            options={assetManagements.map((a) => a.title)}
          />
        </Stack>

        {/* 헤더 우측 메뉴 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <PersonalButton />
        </Stack>
      </>
    );
  }
}

export default AssetMode;
