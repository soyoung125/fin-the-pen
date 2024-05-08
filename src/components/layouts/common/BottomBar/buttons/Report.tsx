import { ButtonIcon } from "@components/layouts/common/BottomBar/buttons/types.ts";
import IconSVG from "@components/common/IconSVG";

function ReportIcon({ selected }: ButtonIcon) {
  return (
    <IconSVG id={selected ? "report-primary" : "report-secondary"} size={28} />
  );
}

export default ReportIcon;
