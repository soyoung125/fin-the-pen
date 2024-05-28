import { ButtonIcon } from "@components/layouts/common/BottomBar/buttons/types.ts";
import IconSVG from "@components/common/IconSVG";

function AssetIcon({ selected }: ButtonIcon) {
  return (
    <IconSVG id={selected ? "asset-primary" : "asset-secondary"} size={28} />
  );
}

export default AssetIcon;
