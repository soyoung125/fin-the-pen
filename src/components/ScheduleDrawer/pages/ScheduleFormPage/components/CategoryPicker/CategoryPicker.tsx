import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";
import ExpenditureCategoryPage from "./pages/ExpenditureCategoryPage";
import IncomeCategoryPage from "./pages/IncomeCategoryPage";
import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useScheduleForm } from "../../../../hooks/useScheduleForm.ts";

export interface CategoryPickerProps {
  setIsCategoryPickerOpen: Dispatch<SetStateAction<boolean>>;
}

function CategoryPicker({ setIsCategoryPickerOpen }: CategoryPickerProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { scheduleForm, updateCategory } = useScheduleForm();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    scheduleForm ? scheduleForm.category : ""
  );

  const isCategorySelected = selectedCategory !== "";

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  const content = (activeTabIndex: number) => {
    switch (activeTabIndex) {
      case 0:
        return (
          <ExpenditureCategoryPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <IncomeCategoryPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      default:
        return <div>부적절한 인덱스 값이 주어졌습니다.</div>;
    }
  };

  return (
    <>
      <TopNavigationBar
        onClick={() => setIsCategoryPickerOpen(false)}
        title="카테고리 설정"
      />
      <Tabs
        value={activeTabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab label="지출" />
        <Tab label="수입" />
      </Tabs>
      <Divider sx={{ borderBottom: "1px solid #E0E0E0" }} />
      <Box height="100vh">{content(activeTabIndex)}</Box>
      <Divider />
      <Box px="20px" pt="8px" pb="28px">
        <Button
          fullWidth
          variant="contained"
          disabled={!isCategorySelected}
          onClick={async () => {
            await updateCategory(selectedCategory);
            setIsCategoryPickerOpen(false);
          }}
        >
          {isCategorySelected
            ? `${selectedCategory} 카테고리 선택`
            : "카테고리를 선택해주세요"}
        </Button>
      </Box>
    </>
  );
}

export default CategoryPicker;
