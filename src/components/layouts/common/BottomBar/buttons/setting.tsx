import { ButtonIcon } from "@components/layouts/common/BottomBar/buttons/types.ts";
import IconSVG from "@components/common/IconSVG";

function SettingIcon({ selected }: ButtonIcon) {
  return (
    <IconSVG
      id={selected ? "setting-primary" : "setting-secondary"}
      size={28}
    />
  );
}

export default SettingIcon;
