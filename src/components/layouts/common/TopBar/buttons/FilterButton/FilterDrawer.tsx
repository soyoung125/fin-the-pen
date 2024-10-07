import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import FilterHeader from "@components/layouts/common/TopBar/buttons/FilterButton/FilterHeader.tsx";
import { categories } from "@components/layouts/common/TopBar/buttons/FilterButton/constants/categories.ts";
import { useSelectCategory } from "@components/layouts/common/TopBar/buttons/FilterButton/hooks/useSelectCategory.ts";
import { useSelectDate } from "@components/layouts/common/TopBar/buttons/FilterButton/hooks/useSelectDate.ts";
import FilterLayout from "@components/layouts/common/TopBar/buttons/FilterButton/FilterLayout.tsx";
import DateInput from "@components/layouts/common/TopBar/buttons/FilterButton/DateInput.tsx";
import reset from "@assets/icons/reset.svg";
import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

interface FilterDrawerProps {
  bottomDrawerOpen: boolean;
  setBottomDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterDrawer({
  bottomDrawerOpen,
  setBottomDrawerOpen,
}: FilterDrawerProps) {
  const { openConfirm } = useDialog();
  const {
    selectedCategories,
    onClickCheckFilterButton,
    isSubCategorySelected,
    isAllSubCategoriesSelected,
    switchSubCategory,
    initSelectedCategories,
  } = useSelectCategory();

  const { date, error: dateError, updateDate, initDate } = useSelectDate();

  const onClickSaveFilter = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "필터 설정을 저장하시겠습니까?",
      approveText: "저장",
      rejectText: "취소",
    });

    if (answer) {
      console.log(JSON.stringify(selectedCategories));
    }
  };

  const initFilter = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "필터를 초기화 하시겠습니까?",
      approveText: "초기화",
      rejectText: "취소",
    });
    if (answer) {
      initSelectedCategories();
      initDate();
    }
  };

  return (
    <>
      <Drawer
        open={bottomDrawerOpen}
        anchor="bottom"
        onClose={() => setBottomDrawerOpen(false)}
      >
        <TopNavigationBar
          onClick={() => setBottomDrawerOpen(false)}
          title="카테고리 필터 설정"
        />

        <Divider />
        <Box height="100vh">
          <Typography mx="20px" my="8px">
            선택한 카테고리의 소비내역만 보여집니다.
          </Typography>

          <FilterHeader title="날짜" />
          <FilterLayout>
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
              <DateInput
                date={date.startDate}
                dateType="startDate"
                updateDate={updateDate}
              />
              <Typography mx={1}>-</Typography>
              <DateInput
                date={date.endDate}
                dateType="endDate"
                updateDate={updateDate}
              />
            </Stack>
            <Typography color="error">{dateError}</Typography>
          </FilterLayout>

          {categories.map((category) => {
            return (
              <Box key={category.type}>
                <FilterHeader
                  title={category.type}
                  isCheckAll={isAllSubCategoriesSelected(category.type)}
                  onClickCheckAll={() => switchSubCategory(category.type)}
                />
                <FilterLayout>
                  {category.subCategories.map((subCategory) => (
                    <Button
                      key={subCategory}
                      variant={
                        isSubCategorySelected(category.type, subCategory)
                          ? "contained"
                          : "outlined"
                      }
                      size="small"
                      sx={{ borderRadius: "18px" }}
                      onClick={() =>
                        onClickCheckFilterButton(category.type, subCategory)
                      }
                    >
                      {subCategory}
                    </Button>
                  ))}
                </FilterLayout>
              </Box>
            );
          })}
        </Box>

        <Stack
          justifyContent="center"
          direction="row"
          alignItems="center"
          color="#5B5F67"
          py="10px"
          onClick={() => initFilter()}
        >
          <img src={reset} alt="reset" width="14px" height="14px" />
          <Typography fontSize="14px">초기화</Typography>
        </Stack>

        <Divider />

        <Stack mt="8px" mb="20px" mx="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClickSaveFilter()}
          >
            선택 완료
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default FilterDrawer;
