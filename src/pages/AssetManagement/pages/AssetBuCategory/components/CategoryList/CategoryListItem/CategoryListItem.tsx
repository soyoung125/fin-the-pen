import { Avatar, Stack, Typography, Collapse, Button } from "@mui/material";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import { ChangeEvent, MouseEvent, useState } from "react";
import drop_up from "@assets/icons/drop_up.svg";
import drop_down from "@assets/icons/drop_down.svg";
import { Category } from "@app/types/asset.ts";
import ListItemAction from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemAction";
import ListItemHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemHeader";

export interface CategoryListItemProps {
  category: string;
  subCategories: string[];
  categoryDetail: Category[];
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
  const [modifyTotal, setModifyTotal] = useState(false);
  const [total, setTotal] = useState(amount);
  const [form, setForm] = useState(categoryDetail);
  const [control, setControl] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(form.map((c) => (c.name === id ? { name: id, value: value } : c)));
  };

  const handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTotal(parseInt(value));
  };

  const handleClickCancel = () => {
    setForm(categoryDetail);
    setControl([]);
    setTotal(amount);
    setModifyTotal(false);
  };

  const handleClickTotal = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setModifyTotal(true);
    setOpen(true);
  };

  return (
    <>
      <ListItemHeader
        category={category}
        mainSubCategory={subCategories[0]}
        open={open}
        total={total}
        modifyTotal={modifyTotal}
        setOpen={setOpen}
        handleClickTotal={handleClickTotal}
        handleChangeTotal={handleChangeTotal}
      />

      <Collapse in={open}>
        {form.map((c) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={2}
            borderBottom="1px solid #F7F7F8"
          >
            <Typography variant="h4">
              <li>{c.name}</li>
            </Typography>
            {control.includes(c.name) ? (
              <input id={c.name} value={c.value} onChange={handleChange} />
            ) : (
              <Typography
                variant="h5"
                color={c.value === "?" ? "#8C919C" : "#131416"}
                onClick={() => setControl(control.concat(c.name))}
              >
                {c.value === "?" ? c.value : Number(c.value).toLocaleString()}원
              </Typography>
            )}
          </Stack>
        ))}

        {(modifyTotal || control.length !== 0) && (
          <ListItemAction
            handleCancel={handleClickCancel}
            handleSubmit={handleSubmit}
          />
        )}
      </Collapse>
    </>
  );
}

export default CategoryListItem;
