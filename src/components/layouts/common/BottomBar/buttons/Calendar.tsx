import { ButtonIcon } from "@components/layouts/common/BottomBar/buttons/types.ts";
import IconSVG from "@components/common/IconSVG";

function CalendarIcon({ selected }: ButtonIcon) {
  return (
    <IconSVG
      id={selected ? "calendar-primary" : "calendar-secondary"}
      size={28}
    />
  );
}

export default CalendarIcon;
