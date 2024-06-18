import {
  AmountBox,
  CategoryBadge,
  EventNameBox,
  HeaderContainer,
  MainContainer,
  PeriodBox,
  StackContainer,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader/RegularScheduleHeader.styles.ts";
import IconSVG from "@components/common/IconSVG";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import CategoryIconSVG from "@components/common/CategoryIconSVG";
import modify from "@assets/icons/modify.svg";
import moment from "moment";
import { Box } from "@mui/material";

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
      <MainContainer>
        <StackContainer>
          <CategoryIconSVG id={CATEGORY_ICONS[category]} size={36} />
          <EventNameBox>{eventName}</EventNameBox>
          <CategoryBadge>{category}</CategoryBadge>
        </StackContainer>
        {clickModify && (
          <img src={modify} alt="modify icon" onClick={clickModify} />
        )}
      </MainContainer>

      <AmountBox>{amount.toLocaleString()}원</AmountBox>

      <StackContainer>
        <IconSVG id={"calendar-primary"} size={16} />
        <PeriodBox>{`${moment(startDate).format(dateFormat)} - ${moment(
          endDate
        ).format(dateFormat)}`}</PeriodBox>
      </StackContainer>
    </HeaderContainer>
  );
}

export default RegularScheduleHeader;