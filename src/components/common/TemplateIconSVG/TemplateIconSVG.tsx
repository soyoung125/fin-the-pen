import { IconSVGProps } from "@components/common/IconSVG/IconSVG.tsx";
import SocialSpriteSVG from "@assets/icons/template-sprite-sheet.svg";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";

function TemplateIconSVG({ id }: Omit<IconSVGProps, "size">) {
  return (
    <svg fill="none" width={16} height={16}>
      <use href={`${SocialSpriteSVG}#${CATEGORY_ICONS[id]}`} />
    </svg>
  );
}

export default TemplateIconSVG;
