import ReportTitle from "@pages/reports/Report/components/ReportTitle";
import { Stack } from "@mui/material";
import PredictBox from "@pages/reports/Report/components/PredictBox";
import useReport from "@hooks/report/useReport.ts";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { useModal } from "@hooks/modal/useModal.tsx";
import UseableInfoModal from "@pages/reports/Report/components/modals/UseableInfoModal";
import ReportBox from "@pages/reports/Report/components/layout/ReportBox";
import ReportLayout from "@pages/reports/Report/components/layout/ReportLayout";
import FixedTransaction from "@pages/reports/Report/components/FixedTransaction";
import setting_icon from "@assets/icons/setting.svg";
import info_icon from "@assets/icons/information.svg";
import asset_icon from "@assets/icons/asset.svg";
import money_icon from "@assets/icons/money.svg";
import MonthlyReport from "@pages/reports/Report/components/MonthlyReport";
import moment from "moment";
import { PATH } from "@constants/path.ts";
import { generateRandomBubbles2 } from "@pages/reports/Report/components/BubbleChart/utils.ts";
import BubbleChart from "@pages/reports/Report/components/BubbleChart";
import PredictReport from "@pages/reports/Report/components/PredictReport";
import { useState } from "react";
import GoalSettingModal from "@pages/reports/Report/components/modals/GoalSettingModal";
import { useNavigate } from "react-router-dom";

function Report() {
  const { year, month, report, reportList, isPending, isError, pickMonth } =
    useReport();
  useHeader(true, HEADER_MODE.analysis);
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState("used");
  const navigate = useNavigate();

  const handleClickAccountInfo = () => {
    openModal({
      modalElement: <UseableInfoModal closeModal={closeModal} />,
      isBackdropClickable: true,
    });
  };

  const handleClickAccountSetting = () => {
    openModal({
      modalElement: (
        <GoalSettingModal
          closeModal={closeModal}
          navigateTo={() => {
            closeModal();
            navigate(PATH.savingsGoal);
          }}
        />
      ),
      isBackdropClickable: true,
    });
  };

  if (isPending) {
    return <>loading</>;
  }

  if (!report?.expenditure_this_month || isError) {
    return <>소비 데이터가 없습니다.</>;
  }

  return (
    <Stack bgcolor="#F7F7F8" px="20px" py="24px" gap="24px">
      <ReportTitle
        year={year}
        month={month}
        amount={Number(report.totalSpentToday)}
        pickMonth={pickMonth}
      />
      <Stack direction="row" gap="10px">
        <PredictBox
          title="이번 달 목표 지출"
          titleIcon={
            <img src={asset_icon} alt="asset" width="28px" height="28px" />
          }
          amount={Number(report.expenseGoalAmount)}
          navigateIcon={<img src={setting_icon} alt="setting" />}
          handleClick={handleClickAccountSetting}
        />
        <PredictBox
          title="사용 가능 금액"
          titleIcon={
            <img src={money_icon} alt="info" width="28px" height="28px" />
          }
          amount={Math.abs(Number(report.availableAmount))}
          navigateIcon={<img src={info_icon} alt="info" />}
          handleClick={handleClickAccountInfo}
        />
      </Stack>
      <ReportBox
        content={
          <ReportLayout
            title="월간 소비 리포트"
            navigateTo={PATH.reportMonthDetail}
            content={
              <BubbleChart bubbles={generateRandomBubbles2(reportList)} />
            }
          />
        }
      />
      <ReportBox
        content={
          <Stack spacing={5}>
            <ReportLayout
              title="소비 예측 리포트"
              content={
                <PredictReport
                  selected={selected}
                  setSelected={setSelected}
                  month={month}
                  goal={Number(report.expenditure_this_month.goal_amount)}
                  predict={Number(
                    report.expenditure_this_month.last_month_Amount
                  )}
                  used={Number(
                    report.expenditure_this_month["1st_month_Amount"]
                  )}
                  useable={Number(report.expenditure_this_month.result_amount)}
                />
              }
            />
            <ReportLayout
              title={`${month}월 고정 입출금`}
              content={
                <Stack spacing={1.5} pt={3}>
                  <FixedTransaction
                    title={"고정 수입"}
                    amount={Number(report.Nmonth_fixed.fixed_deposit)}
                    month={moment(report.Nmonth_fixed.previous_month).format(
                      "M"
                    )}
                    difference={Number(report.Nmonth_fixed.previous_diff_plus)}
                  />
                  <FixedTransaction
                    title={"고정 지출"}
                    amount={Number(report.Nmonth_fixed.fixed_withdraw)}
                    month={moment(report.Nmonth_fixed.previous_month).format(
                      "M"
                    )}
                    difference={Number(report.Nmonth_fixed.previous_diff_minus)}
                  />
                </Stack>
              }
            />
            <ReportLayout
              title="월별 소비 리포트"
              content={
                <MonthlyReport
                  month={month}
                  previousSpending={Number(report.month_report.previous)}
                  spending={Number(report.month_report.current)}
                  twoMonthsAgoSpending={Number(
                    report.month_report.second_previous
                  )}
                />
              }
            />
          </Stack>
        }
      />
    </Stack>
  );
}

export default Report;
