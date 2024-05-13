import { IconSVGProps } from "@components/common/IconSVG/IconSVG.tsx";
import SocialSpriteSVG from "@assets/icons/category-sprite-sheet.svg";

function CategoryIconSVG({ id, size }: IconSVGProps) {
  return (
    <svg fill="none" width={42} height={size}>
      <use href={`${SocialSpriteSVG}#${id}`} />
    </svg>
  );
}

export default CategoryIconSVG;
