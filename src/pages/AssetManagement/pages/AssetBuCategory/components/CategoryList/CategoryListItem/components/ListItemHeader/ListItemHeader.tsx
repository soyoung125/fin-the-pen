import { Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import {
  UnderlinedInput,
  UnderlinedInputBox,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryList.styles.ts";
import CategoryIconSVG from "@components/common/CategoryIconSVG";

export interface ListItemHeaderProps {
  category: { name: string; subCategory: string[] };
  open: boolean;
  modifyTotal: boolean;
  isAutoFocus: boolean;
  total: number;
  smallSummary: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChangeTotal: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickTotal: (e: MouseEvent<HTMLSpanElement>) => void;
}

function ListItemHeader({
  category,
  modifyTotal,
  setOpen,
  total,
  open,
  isAutoFocus,
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
      <CategoryIconSVG id={category.subCategory[0]} size={42} />
      <Typography variant="h4">{category.name}</Typography>
      {modifyTotal ? (
        <UnderlinedInputBox>
          <UnderlinedInput
            value={total.toLocaleString()}
            onChange={handleChangeTotal}
            onClick={(e) => e.stopPropagation()}
            inputMode="numeric"
            $color={open ? "#EAE1FD" : "#fff"}
            $isShake={smallSummary > total}
            autoFocus={isAutoFocus}
          />
          <span>원</span>
        </UnderlinedInputBox>
      ) : (
        <Typography
          variant="h5"
          onClick={handleClickTotal}
          sx={{ flexGrow: 1, textAlign: "end" }}
        >
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
