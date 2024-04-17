import { Stack, Typography, Collapse } from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Category, setAssetByCategory } from "@app/types/asset.ts";
import ListItemAction from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemAction";
import ListItemHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemHeader";
import {
  UnderlinedInput,
  UnderlinedInputBox,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryList.styles.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { getAmount } from "@pages/AssetManagement/utils.ts";

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
  const [total, setTotal] = useState(amount);
  const [form, setForm] = useState(categoryDetail);
  const [control, setControl] = useState<string[]>([]);

  const { openConfirm } = useDialog();

  const smallSummary = form.reduce((result, curr) => {
    return result + getAmount(curr.value);
  }, 0);

  useEffect(() => {
    if (!open) {
      handleClickCancel();
    }
  }, [open]);

  useEffect(() => {
    setTotal(amount);
    setForm(categoryDetail);
    setControl([]);
  }, [amount]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newValue = parseInt(value.replaceAll(",", ""));
    const summary = form.reduce((result, curr) => {
      if (curr.name == id) {
        return result + newValue;
      }
      return result + getAmount(curr.value);
    }, 0);
    if (summary > total) {
      setTotal(summary);
    }

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
  };

  const handleClickTotal = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setControl(control.concat(category));
    setOpen(true);
  };

  const handleClickSubmit = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "현재 정보로 설정하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      saveResult();
    }
  };

  const saveResult = () => {
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
  };

  return (
    <>
      <ListItemHeader
        category={category}
        mainSubCategory={subCategories[0]}
        open={open}
        total={total}
        modifyTotal={control.includes(category)}
        smallSummary={smallSummary}
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
                  autoFocus
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

        {control.length !== 0 && (
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
