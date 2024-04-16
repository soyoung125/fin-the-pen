import { Stack, Typography, Collapse } from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Category, setAssetByCategory } from "@app/types/asset.ts";
import ListItemAction from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemAction";
import ListItemHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemHeader";
import {
  UnderlinedInput,
  UnderlinedInputBox,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryList.styles.ts";

export interface CategoryListItemProps {
  category: string;
  subCategories: string[];
  categoryDetail: Category[];
  amount: number;
  handleSubmit: (form: Omit<setAssetByCategory, "user_id" | "date">) => void;
}

function CategoryListItem({
  category,
  subCategories,
  categoryDetail,
  amount,
  handleSubmit,
}: CategoryListItemProps) {
  const [open, setOpen] = useState(false);
  const [modifyTotal, setModifyTotal] = useState(false);
  const [total, setTotal] = useState(amount);
  const [form, setForm] = useState(categoryDetail);
  const [control, setControl] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      handleClickCancel();
    }
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newValue = parseInt(value.replaceAll(",", ""));
    if (newValue) {
      setForm(
        form.map((c) =>
          c.name === id ? { name: id, value: newValue.toString() } : c
        )
      );
    } else {
      setForm(form.map((c) => (c.name === id ? { name: id, value: "0" } : c)));
    }
  };

  const handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = parseInt(value.replaceAll(",", ""));
    if (newValue) {
      setTotal(newValue);
    } else {
      setTotal(0);
    }
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

  const handleClickSubmit = () => {
    const smallMap = form.reduce(
      (previousValue: { [key: string]: string }, currentValue) => {
        previousValue[currentValue.name] = currentValue.value;
        return previousValue;
      },
      {}
    );
    handleSubmit({
      medium_name: category,
      medium_value: total.toString(),
      small_map: smallMap,
    });
    setControl([]);
    setModifyTotal(false);
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
              <UnderlinedInputBox>
                <UnderlinedInput
                  id={c.name}
                  value={
                    c.value === "?" ? "0" : parseInt(c.value).toLocaleString()
                  }
                  onChange={handleChange}
                />
                <span>원</span>
              </UnderlinedInputBox>
            ) : (
              <Typography
                variant="h5"
                color={c.value === "?" ? "#8C919C" : "#131416"}
                onClick={() => setControl(control.concat(c.name))}
              >
                {c.value === "?" ? c.value : parseInt(c.value).toLocaleString()}
                원
              </Typography>
            )}
          </Stack>
        ))}

        {(modifyTotal || control.length !== 0) && (
          <ListItemAction
            handleCancel={handleClickCancel}
            handleSubmit={handleClickSubmit}
          />
        )}
      </Collapse>
    </>
  );
}

export default CategoryListItem;
