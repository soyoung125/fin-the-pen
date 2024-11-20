import { UpdateStateInterface } from "@app/types/common.ts";
import {
  selectScheduleForm,
  setDrawerScheduleForm,
  setSelectedTemplate,
} from "@redux/slices/scheduleSlice.tsx";
import moment from "moment/moment";
import {
  INIT_PERIOD,
  INIT_REPEAT,
  SCHEDULE_DRAWER,
  SCHEDULE_REQUEST,
} from "@constants/schedule.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import { useSelector } from "react-redux";
import {
  CATEGORIES,
  INCOME_CATEGORY,
} from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";
import { SchedulePeriod, ScheduleRepeat } from "@app/types/schedule.ts";
import { useTemplateSchedule } from "@app/tanstack-query/templates/useTemplateSchedule.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

export const getType = (category: string) => {
  if (INCOME_CATEGORY.includes(category)) {
    return SCHEDULE_DRAWER.type_plus;
  } else {
    return SCHEDULE_DRAWER.type_minus;
  }
};

export const getPriceType = (type: string) => (type === "+" ? "Plus" : "Minus");
export const getPriceTypeSign = (type: string) => {
  if (type === "Plus") return "+";
  else if (type === "Minus") return "-";
  return type;
};

export const getRepeatEndDate = (
  startDate: string | undefined,
  type: string | undefined
) => {
  let date = moment(startDate);
  switch (type) {
    case "day": {
      date = date.add(1, "w");
      break;
    }
    case "week": {
      date = date.add(1, "M");
      break;
    }
    case "month": {
      date = date.add(1, "y");
      break;
    }
    case "year": {
      date = date.add(10, "y");
      break;
    }
    default:
      break;
  }
  return date.format("YYYY-MM-DD");
};

export const useScheduleForm = () => {
  const dispatch = useAppDispatch();
  const scheduleForm = useSelector(selectScheduleForm);
  const { importTemplate } = useTemplateSchedule();
  const { data: user } = useUser();
  const { openConfirm } = useDialog();

  const setRandomGeneratedSchedule = (stringDate: string) => {
    const date = moment(stringDate);
    const generateRandomString = (num: number) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < num; i += 1) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    const paymentTypes = ["ACCOUNT", "CARD", "CASH"];
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const randomSchedule = {
      event_name: generateRandomString(5),
      start_date: date.format("YYYY-MM-DD"),
      end_date: date.format("YYYY-MM-DD"),
      start_time: `0${Math.floor(Math.random() * 9 + 1)}:00`,
      end_time: `2${Math.floor(Math.random() * 4)}:00`,
      category: category,
      is_all_day: false,
      repeat: INIT_REPEAT(date),
      period: INIT_PERIOD(date),
      price_type: getType(category),
      set_amount: Math.floor(Math.random() * 1000) * 100,
      fix_amount: false,
      payment_type: paymentTypes[Math.floor(Math.random() * 3)],
      exclusion: Math.floor(Math.random() * 2) === 0,
    };
    dispatch(setDrawerScheduleForm(randomSchedule));
  };

  const updateSchedule = (
    state:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | UpdateStateInterface
  ) => {
    switch (state.target.id) {
      case "start_time": {
        const endTime = moment(state.target.value as string, "HH:mm")
          .add(2, "hours")
          .format("HH:mm");
        dispatch(
          setDrawerScheduleForm({
            ...scheduleForm,
            [state.target.id]: state.target.value,
            end_time: endTime,
          })
        );
        break;
      }
      case "start_date": {
        const startDate = state.target.value as string;

        initRepeat(startDate);
        break;
      }
      case "end_date":
        if (
          moment(scheduleForm?.start_date).isAfter(state.target.value as string)
        ) {
          dispatch(
            setDrawerScheduleForm({
              ...scheduleForm,
              start_date: state.target.value,
              [state.target.id]: state.target.value,
            })
          );
        } else {
          dispatch(
            setDrawerScheduleForm({
              ...scheduleForm,
              [state.target.id]: state.target.value,
            })
          );
        }
        break;
      default:
        dispatch(
          setDrawerScheduleForm({
            ...scheduleForm,
            [state.target.id]: state.target.value,
          })
        );
        break;
    }
  };

  const isExist = async (c?: string) => {
    if (!scheduleForm) return;
    const eventName = scheduleForm.event_name;
    const category = c ?? scheduleForm.category;

    if (eventName === "" || category === "") return;

    const res = await importTemplate({
      user_id: user?.user_id ?? "",
      category_name: category,
      event_name: eventName,
    });

    if (res.template_data.template_id === "") return;
    const template = res.template_data;
    const schedule = res.schedule_data;

    const answer = await openConfirm({
      title: "알림",
      content: `동일한 정기 템플릿이 존재합니다.\n템플릿에 일정을 추가하시겠습니까?\n\n{${template.category_name}}\n{${template.template_name}}`,
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      dispatch(
        setSelectedTemplate({
          ...template,
          id: Number(template.template_id),
        })
      );
      schedule &&
        dispatch(
          setDrawerScheduleForm({
            ...SCHEDULE_REQUEST({ ...schedule, schedule_id: undefined }),
            register_template: true,
          })
        );
    } else {
      dispatch(
        setSelectedTemplate({
          ...template,
          id: -2,
        })
      );
    }
  };

  const initRepeat = (startDate: string) => {
    const start = moment(startDate);
    const repeat = {
      ...scheduleForm?.repeat,
      week_type: {
        ...scheduleForm?.repeat.week_type,
        repeat_day_of_week: start.locale("en").format("dddd").toUpperCase(),
      },
      month_type: {
        ...scheduleForm?.repeat.month_type,
        select_date: start.format("D"),
      },
      year_type: {
        ...scheduleForm?.repeat.year_type,
        year_repeat: start.format("M월 D일"),
        year_category: "MonthAndDay",
      },
    };
    const period = {
      ...scheduleForm?.period,
      repeat_end_line: getRepeatEndDate(
        startDate,
        scheduleForm?.repeat.kind_type
      ),
    };

    dispatch(
      setDrawerScheduleForm({
        ...scheduleForm,
        end_date: startDate,
        start_date: startDate,
        repeat,
        period,
      })
    );
  };

  const getRepeat = () => {
    if (!scheduleForm) return "";

    const type = { day: "일", week: "주", month: "달", year: "년" };
    const repeatType = scheduleForm.repeat.kind_type;

    if (repeatType === "none") return "";

    const term = scheduleForm.repeat[`${repeatType}_type`].repeat_term;
    const repeat = `${term}${type[repeatType]}마다`;
    switch (scheduleForm.period.kind_type) {
      case "is_repeat_again":
        return `${repeat} 반복`;
      case "repeat_number_time":
        return `${repeat} ${scheduleForm.period.repeat_number_time}회 반복`;
      case "repeat_end_line":
        return `${repeat} ${scheduleForm.period.repeat_end_line}까지 반복`;
    }
  };

  const updateAllDay = (state: {
    target: { value: boolean; name: string };
  }) => {
    dispatch(
      setDrawerScheduleForm({
        ...scheduleForm,
        [state.target.name]: state.target.value,
      })
    );
  };

  const updateRepeat = (state: UpdateStateInterface) => {
    const { value } = state.target;
    const period = {
      ...scheduleForm?.period,
      repeat_end_line: getRepeatEndDate(
        scheduleForm?.start_date,
        value as string
      ),
    };
    dispatch(
      setDrawerScheduleForm({
        ...scheduleForm,
        repeat: {
          ...scheduleForm?.repeat,
          kind_type: value,
        },
        period,
        is_all_day: true,
      })
    );
  };

  const updateExclusion = (state: boolean) => {
    dispatch(setDrawerScheduleForm({ ...scheduleForm, exclusion: state }));
  };

  const updateRepeatAndPeriod = (
    repeat: ScheduleRepeat,
    period: SchedulePeriod
  ) => {
    if (repeat.kind_type !== "none") {
      dispatch(
        setDrawerScheduleForm({
          ...scheduleForm,
          repeat,
          period,
          is_all_day: true,
        })
      );
    } else {
      dispatch(
        setDrawerScheduleForm({
          ...scheduleForm,
          repeat,
          period,
          is_all_day: false,
        })
      );
    }
  };

  const updateCategory = async (value: string) => {
    dispatch(
      setDrawerScheduleForm({
        ...scheduleForm,
        category: value,
        price_type: getType(value),
      })
    );
    await isExist(value);
  };

  return {
    scheduleForm,
    updateSchedule,
    updateAllDay,
    updateRepeat,
    updateExclusion,
    setRandomGeneratedSchedule,
    updateRepeatAndPeriod,
    getRepeat,
    updateCategory,
    isExist,
  };
};
