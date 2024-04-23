import { RegularAssetHeaderContainer } from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader/RegularAssetHeader.styles.ts";
import { Stack, Typography } from "@mui/material";
import calendar_outlined from "@assets/icons/calendar_outlined.svg";

export interface RegularAssetHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
  changeDate: () => void;
  clickDetail?: () => void;
}

function RegularAssetHeader({
  title,
  startDate,
  endDate,
  changeDate,
  clickDetail,
}: RegularAssetHeaderProps) {
  return (
    <RegularAssetHeaderContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="22px" fontWeight={500}>
          {title}
        </Typography>
        {clickDetail && (
          <Typography fontSize="13px" color="#8C919C" onClick={clickDetail}>
            자세히
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        onClick={changeDate}
      >
        <img src={calendar_outlined} alt="calendar_outlined" />
        <Typography fontSize="13px" color="#8C919C">
          {`${startDate} - ${endDate}`}
        </Typography>
      </Stack>
    </RegularAssetHeaderContainer>
  );
}

export default RegularAssetHeader;
