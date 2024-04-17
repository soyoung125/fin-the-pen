import { Avatar, Stack, Typography } from "@mui/material";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import {
  UnderlinedInput,
  UnderlinedInputBox,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryList.styles.ts";

export interface ListItemHeaderProps {
  category: string;
  mainSubCategory: string;
  open: boolean;
  modifyTotal: boolean;
  total: number;
  smallSummary: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChangeTotal: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickTotal: (e: MouseEvent<HTMLSpanElement>) => void;
}

function ListItemHeader({
  mainSubCategory,
  category,
  modifyTotal,
  setOpen,
  total,
  open,
  smallSummary,
  handleChangeTotal,
  handleClickTotal,
}: ListItemHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      p={2}
      onClick={() => setOpen((prevState) => !prevState)}
      bgcolor={open ? "#EAE1FD" : "#fff"}
      borderBottom="1px solid #F7F7F8"
    >
      <Avatar
        alt="category icon"
        src={CATEGORY_ICONS[mainSubCategory]}
        sx={{ width: 42, height: 42 }}
      >
        {category}
      </Avatar>
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        {category}
      </Typography>
      {modifyTotal ? (
        <UnderlinedInputBox>
          <UnderlinedInput
            value={total.toLocaleString()}
            onChange={handleChangeTotal}
            onClick={(e) => e.stopPropagation()}
            $color={open ? "#EAE1FD" : "#fff"}
            $isShake={smallSummary > total}
            autoFocus
          />
          <span>원</span>
        </UnderlinedInputBox>
      ) : (
        <Typography variant="h5" onClick={handleClickTotal}>
          {total.toLocaleString()}원
        </Typography>
      )}
      {open ? (
        <ArrowDropDownIcon color="primary" fontSize="large" />
      ) : (
        <ArrowDropUpIcon color="primary" fontSize="large" />
      )}
    </Stack>
  );
}

export default ListItemHeader;
