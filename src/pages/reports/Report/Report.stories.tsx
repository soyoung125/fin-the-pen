import { Meta } from "@storybook/react";
import { Stack } from "@mui/material";
import ReportTitle from "@pages/reports/Report/components/ReportTitle";
import ReportBox from "pages/reports/Report/components/layout/ReportBox";
import PredictBox from "@pages/reports/Report/components/PredictBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import ReportLayout from "@pages/reports/Report/components/layout/ReportLayout";
import { CategoryReport, Report } from "@app/types/report.ts";
import { generateRandomBubbles2 } from "@pages/reports/Report/components/BubbleChart/utils.ts";
import BubbleChart from "@pages/reports/Report/components/BubbleChart";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import PredictReport from "@pages/reports/Report/components/PredictReport";
import FixedTransaction from "@pages/reports/Report/components/FixedTransaction";
import MonthlyReport from "@pages/reports/Report/components/MonthlyReport";
import { PATH } from "@constants/path.ts";

const meta = {
  title: "reports/Report",
  component: undefined,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta;

export default meta;

const useReport = () => {
  const [selected, setSelected] = useState("used");
  const goal = 1009000;
  const used = 117000;
  const predict = 13000;
  const useable = 1009000 - 117000 - 13000;

  const [yearMonth, setYearMonth] = useState("2023-5");
  const [year, month] = yearMonth.split("-").map((s) => Number(s));
  const { openMonthPicker } = useDatePicker();

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM"));
  };

  const addMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.add(1, "month").format("YYYY-MM"));
  };

  const subtractMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.subtract(1, "month").format("YYYY-MM"));
  };

  return {
    selected,
    setSelected,
    goal,
    used,
    predict,
    useable,
    month,
    year,
    pickMonth,
    addMonth,
    subtractMonth,
  };
};

export const PageExample = () => {
  const {
    selected,
    setSelected,
    year,
    month,
    goal,
    used,
    predict,
    useable,
    pickMonth,
  } = useReport();
  const list: CategoryReport[] = [
    {
      amount: 71000,
      rate: "20",
      category: "식비",
    },
    {
      amount: 71000,
      rate: "12",
      category: "미용",
    },
    {
      amount: 71000,
      rate: "8",
      category: "자동차",
    },
    {
      amount: 71000,
      rate: "7",
      category: "패션/쇼핑",
    },
    {
      amount: 71000,
      rate: "6",
      category: "카페",
    },
  ];

  return (
    <>
      <TopNavigationBar onClick={() => alert("hey")} title="월간 소비 리포트" />
      <Stack bgcolor="#F7F7F8" px="20px" py="24px" gap="24px">
        <ReportTitle
          year={year}
          month={month}
          amount={used}
          pickMonth={pickMonth}
        />
        <Stack direction="row" gap="10px">
          <PredictBox
            title="이번 달 목표 지출"
            titleIcon={<AccountBalanceWalletIcon />}
            amount={goal}
            navigateIcon={<SettingsIcon />}
            handleClick={() => alert("goal")}
          />
          <PredictBox
            title="사용 가능 금액"
            titleIcon={<InfoOutlinedIcon />}
            amount={useable}
            navigateIcon={<InfoOutlinedIcon />}
            handleClick={() => alert("useable amount")}
          />
        </Stack>
        <ReportBox
          content={
            <ReportLayout
              title="월간 소비 리포트"
              handleClick={() => alert("click")}
              actionContent="자세히 보기"
              content={<BubbleChart bubbles={generateRandomBubbles2(list)} />}
            />
          }
        />
        <ReportBox
          content={
            <Stack spacing={5}>
              <ReportLayout
                title="소비 예측 리포트"
                handleClick={() => alert("click")}
                actionContent="지출 목표 설정하기"
                content={
                  <PredictReport
                    selected={selected}
                    setSelected={setSelected}
                    month={month}
                    goal={goal}
                    predict={predict}
                    used={used}
                    useable={useable}
                  />
                }
              />
              <ReportLayout
                title="N월 고정 입출금"
                content={
                  <Stack spacing={2}>
                    <FixedTransaction
                      title={"고정 수입"}
                      amount={12000000}
                      month={month.toString()}
                      difference={-200000}
                    />
                    <FixedTransaction
                      title={"고정 지출"}
                      amount={579000}
                      month={month.toString()}
                      difference={200000}
                    />
                  </Stack>
                }
              />
              <ReportLayout
                title="월별 소비 리포트"
                content={
                  <MonthlyReport
                    month={month}
                    previousSpending={400000}
                    spending={600000}
                    twoMonthsAgoSpending={500000}
                  />
                }
              />
            </Stack>
          }
        />
      </Stack>
    </>
  );
};
