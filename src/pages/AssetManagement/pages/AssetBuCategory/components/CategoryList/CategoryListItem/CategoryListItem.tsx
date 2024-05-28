import { Stack, Typography, Collapse } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AssetByCategory, setAssetByCategory } from "@app/types/asset.ts";
import ListItemAction from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemAction";
import ListItemHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/components/ListItemHeader";
import {
  UnderlinedInput,
  UnderlinedInputBox,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryList.styles.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { getAmount } from "@pages/AssetManagement/utils.ts";

export interface CategoryListItemProps {
  category: { name: string; subCategory: string[] };
  categoryList: AssetByCategory;
  control: string;
  setControl: Dispatch<SetStateAction<string>>;
  closeControl: () => void;
  handleSubmit: (form: Omit<setAssetByCategory, "user_id" | "date">) => void;
  compareTotal: (prev: number, curr: number) => void;
}

function CategoryListItem({
  category,
  categoryList,
  control,
  setControl,
  closeControl,
  handleSubmit,
  compareTotal,
}: CategoryListItemProps) {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(Number(categoryList.category_total));
  const [form, setForm] = useState(categoryList.list);

  const isModify =
    control === category.name ||
    categoryList.list.filter((c) => c.name === control).length !== 0;

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
    reset();
  }, [categoryList.category_total]);

  useEffect(() => {
    compareTotal(Number(categoryList.category_total), total);
  }, [total]);

  const reset = () => {
    setTotal(Number(categoryList.category_total));
    setForm(categoryList.list);
    closeControl();
  };

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
    const newValue = parseInt(value.replaceAll(",", "")) ?? 0;
    setTotal(newValue);
  };

  const handleClickCancel = () => {
    reset();
  };

  const handleClickTotal = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setControl(category.name);
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
      medium_name: category.name,
      medium_value: total.toString(),
      small_map: smallMap,
    });
    closeControl();
  };

  return (
    <>
      <ListItemHeader
        category={category}
        open={open}
        total={total}
        modifyTotal={isModify}
        isAutoFocus={control === category.name}
        smallSummary={smallSummary}
        setOpen={setOpen}
        handleClickTotal={handleClickTotal}
        handleChangeTotal={handleChangeTotal}
      />

      <Collapse in={open}>
        {form.map((c) => (
          <Stack
            key={c.name}
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
            {isModify ? (
              <UnderlinedInputBox>
                <UnderlinedInput
                  id={c.name}
                  value={
                    c.value === "?" ? "0" : parseInt(c.value).toLocaleString()
                  }
                  onChange={handleChange}
                  autoFocus={control === c.name}
                />
                <span>원</span>
              </UnderlinedInputBox>
            ) : (
              <Typography
                variant="h5"
                color={c.value === "?" ? "#8C919C" : "#131416"}
                onClick={() => setControl(c.name)}
              >
                {c.value === "?" ? c.value : parseInt(c.value).toLocaleString()}
                원
              </Typography>
            )}
          </Stack>
        ))}

        {isModify && (
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
