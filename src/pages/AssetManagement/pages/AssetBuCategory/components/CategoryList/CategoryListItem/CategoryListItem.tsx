import { Avatar, Stack, Typography, Collapse, Button } from "@mui/material";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import { useState } from "react";
import drop_up from "@assets/icons/drop_up.svg";
import drop_down from "@assets/icons/drop_down.svg";

interface subCategory {
  [key: string]: string;
}

export interface CategoryListItemProps {
  category: string;
  subCategories: string[];
  categoryDetail: subCategory;
  amount: number;
  handleCancel: () => void;
  handleSubmit: () => void;
}

function CategoryListItem({
  category,
  subCategories,
  categoryDetail,
  amount,
  handleCancel,
  handleSubmit,
}: CategoryListItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          src={CATEGORY_ICONS[subCategories[0]]}
          sx={{ width: 42, height: 42 }}
        >
          {category}
        </Avatar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {category}
        </Typography>
        <Typography variant="h5">{amount.toLocaleString()}원</Typography>
        <img src={open ? drop_up : drop_down} alt="drop" />
      </Stack>
      <Collapse in={open}>
        {subCategories.map((c) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={2}
            borderBottom="1px solid #F7F7F8"
          >
            <Typography variant="h4">
              <li>{c}</li>
            </Typography>
            <Typography
              variant="h5"
              color={categoryDetail[c] === "?" ? "#8C919C" : "#131416"}
            >
              {categoryDetail[c].toLocaleString()}원
            </Typography>
          </Stack>
        ))}

        <Stack direction="row" spacing={1} px={3} pt={1}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            확인
          </Button>
        </Stack>
      </Collapse>
    </>
  );
}

export default CategoryListItem;
