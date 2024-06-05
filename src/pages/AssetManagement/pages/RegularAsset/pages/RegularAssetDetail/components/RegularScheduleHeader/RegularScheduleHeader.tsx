import {
  AmountBox,
  CategoryBadge,
  EventNameBox,
  HeaderContainer,
  PeriodBox,
  StackContainer,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader/RegularScheduleHeader.styles.ts";
import IconSVG from "@components/common/IconSVG";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import CategoryIconSVG from "@components/common/CategoryIconSVG";
import modify from "@assets/icons/modify.svg";
import moment from "moment";

export interface RegularScheduleHeaderProps {
  startDate: string;
  endDate: string;
  category: string;
  eventName?: string;
  amount: number;
  changeDate: () => void;
  clickModify: () => void;
}

function RegularScheduleHeader({
  eventName,
  startDate,
  endDate,
  amount,
  category,
  changeDate,
  clickModify,
}: RegularScheduleHeaderProps) {
  const dateFormat = "YYYY.MM.DD";

  return (
    <HeaderContainer onClick={changeDate}>
      <StackContainer>
        <IconSVG id={"calendar-primary"} size={16} />
        <PeriodBox>{`${moment(startDate).format(dateFormat)} - ${moment(
          endDate
        ).format(dateFormat)}`}</PeriodBox>
      </StackContainer>

      <StackContainer>
        <CategoryIconSVG id={CATEGORY_ICONS[category]} size={36} />
        <EventNameBox>{eventName}</EventNameBox>
        <CategoryBadge>{category}</CategoryBadge>
        <img src={modify} alt="modify icon" onClick={clickModify} />
      </StackContainer>

      <AmountBox>{amount.toLocaleString()}원</AmountBox>
    </HeaderContainer>
  );
}

export default RegularScheduleHeader;
