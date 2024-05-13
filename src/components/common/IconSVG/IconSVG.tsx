import SocialSpriteSVG from "@assets/icons/main-sprite-sheet.svg";

export interface IconSVGProps {
  id: string;
  size: number;
}

function IconSVG({ id, size }: IconSVGProps) {
  return (
    <svg fill="none" width={size} height={size}>
      <use href={`${SocialSpriteSVG}#${id}`} />
    </svg>
  );
}

export default IconSVG;
