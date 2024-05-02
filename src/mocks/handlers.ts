// src/mocks/handlers.js
// import { rest } from "msw";
import { delay, http, HttpResponse } from "msw";
import {
  LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY,
  LOCAL_STORAGE_KEY_GOAL,
  LOCAL_STORAGE_KEY_SAVING_GOAL,
  LOCAL_STORAGE_KEY_SCHEDULES,
  LOCAL_STORAGE_KEY_SPENDING_GOAL,
  LOCAL_STORAGE_KEY_USERS,
} from "@api/keys.ts";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { DOMAIN } from "@api/url.ts";
import { MockUser, SignUp, User } from "@app/types/auth.ts";
import {
  DaySchedule,
  HomeQuery,
  MonthSchedule,
  MonthScheduleQuery,
  RequestSchedule,
  Schedule,
  WeekSchedule,
} from "@app/types/schedule.ts";
import moment from "moment";
import {
  AssetByCategory,
  AssetsByCategory,
  SavingGoal,
  setAssetByCategory,
  SetPersonalGoalQuery,
  setSavingGoalQuery,
  setSpendingGoal,
  SpendingGoal,
} from "@app/types/asset.ts";
import { INIT_ASSET_BY_CATEGORY } from "@app/tanstack-query/assetManagement/AssetByCategory/utils.ts";
import { RequestDeleteSchedule } from "@app/tanstack-query/schedules/useDeleteSchedule.ts";
import { RequestModifySchedule } from "@app/tanstack-query/schedules/useModifySchedule.ts";
import { GoalResponse } from "@app/types/report.ts";

const getSign = (type: string) => (type === "Plus" ? "+" : "-");

export const handlers = [
  http.post<object, MockUser, MockUser>(
    `${DOMAIN}/sign-up`,
    async ({ request }) => {
      type MockUser = User & { password: string };
      await delay(1000);

      const newUser: MockUser = await request.json();
      const prevUsers = getLocalStorage<MockUser[]>(
        LOCAL_STORAGE_KEY_USERS,
        []
      );

      if (prevUsers.find((user) => user.user_id === newUser.user_id)) {
        return HttpResponse.json({ ...newUser, user_id: "" }, { status: 200 });
      }

      const newUsers: MockUser[] = [...prevUsers, newUser];

      setLocalStorage(LOCAL_STORAGE_KEY_USERS, newUsers);

      return HttpResponse.json(newUser, { status: 200 });
    }
  ),

  http.post<object, SignUp, MockUser | string>(
    `${DOMAIN}/sign-in`,
    async ({ request }) => {
      const credentials: SignUp = await request.json();
      const users = getLocalStorage<MockUser[]>(LOCAL_STORAGE_KEY_USERS, []);
      const user = users.find(
        (user) =>
          user.user_id === credentials.user_id &&
          user.password === credentials.password
      );
      delay(1000);

      if (user === undefined) {
        return HttpResponse.json("", { status: 200 });
      }

      const randomEightDigit = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();

      return HttpResponse.json(
        { ...user, token: randomEightDigit },
        { status: 200 }
      );
    }
  ),

  http.post<object, RequestSchedule>(
    `${DOMAIN}/createSchedule`,
    async ({ request }) => {
      const schedule = await request.json();
      const prevSchedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );
      const isExist = prevSchedules.find(
        (s) => s.schedule_id === schedule.schedule_id
      );
      await delay(1000);

      if (isExist) {
        return HttpResponse.json(false, { status: 400 });
      }
      const repeatType = schedule.repeat.kind_type;
      const newSchedules: Schedule[] = [
        ...prevSchedules,
        {
          ...schedule,
          price_type: getSign(schedule.price_type),
          all_day: schedule.is_all_day,
          repeat_kind: repeatType.toLocaleUpperCase() as
            | "NONE"
            | "DAY"
            | "WEEK"
            | "MONTH"
            | "YEAR",
          repeat_options: {
            term:
              repeatType !== "none"
                ? schedule.repeat[`${repeatType}_type`].repeat_term
                : "null",
            options: "null",
          },
          amount: schedule.set_amount,
          exclude: schedule.exclusion,
        },
      ];
      setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.delete<object, RequestDeleteSchedule>(
    `${DOMAIN}/deleteSchedule`,
    async ({ request }) => {
      const { schedule_id } = await request.json();
      const prevSchedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );
      const newSchedules = prevSchedules.filter(
        (schedule) => schedule.schedule_id !== schedule_id
      );
      setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.post<object, RequestModifySchedule>(
    `${DOMAIN}/modifySchedule`,
    async ({ request }) => {
      const schedule = await request.json();

      const prevSchedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );
      const repeatType = schedule.repeat.kind_type;
      const newSchedules = prevSchedules.map((s) =>
        s.schedule_id === schedule.schedule_id
          ? {
              ...schedule,
              price_type: getSign(schedule.price_type),
              all_day: schedule.is_all_day,
              repeat_kind: repeatType.toLocaleUpperCase(),
              repeat_options: {
                term:
                  repeatType !== "none"
                    ? schedule.repeat[`${repeatType}_type`].repeat_term
                    : null,
                options: null,
              },
              amount: schedule.set_amount,
              exclude: schedule.exclusion,
            }
          : s
      );
      setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.post<object, HomeQuery>(`${DOMAIN}/home/month`, async ({ request }) => {
    const { user_id, calendar_date } = await request.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSame(schedule.start_date, "month")
    );
    await delay(1000);
    if (monthSchedules.length === 0) {
      return HttpResponse.json(
        {
          income: "0",
          available: "0",
          data: [],
          expense: "0",
          count: 0,
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      {
        income: "10000",
        available: "2000",
        data: monthSchedules,
        expense: "8000",
        count: monthSchedules.length,
      },
      { status: 200 }
    );
  }),

  http.post(`${DOMAIN}/home/week`, async ({ request }) => {
    await delay(1000);
    return HttpResponse.json({}, { status: 400 });
  }),

  http.post<object, HomeQuery>(`${DOMAIN}/home/day`, async ({ request }) => {
    const { user_id, calendar_date } = await request.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSame(schedule.start_date, "month")
    );
    await delay(1000);

    if (monthSchedules.length === 0) {
      return HttpResponse.json(
        {
          income: "0",
          available: "0",
          dayExpense: "0",
          expect: "0",
          schedule_count: 0,
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      {
        income: "10000",
        available: "1000",
        dayExpense: "8000",
        expect: "1000",
        schedule_count: monthSchedules.length,
      },
      { status: 200 }
    );
  }),

  http.get<MonthScheduleQuery>(`${DOMAIN}/report/month`, async ({ params }) => {
    // const user_id = req.url.searchParams.get("user_id");
    // const date = req.url.searchParams.get("date");
    const { user_id, date } = params;
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(date).isSame(schedule.start_date, "month")
    );
    await delay(1000);

    if (monthSchedules.length === 0) {
      return HttpResponse.json(
        {
          date: date,
          expenditure_this_month: {
            last_month_Amount: "0",
            "1st_month_Amount": "0",
            goal_amount: "0",
            result_amount: "0",
          },
          availableAmount: "0",
          expenseGoalAmount: "0",
          month_report: {
            current: "0",
            second_previous: "0",
            previous: "0",
          },
          category_consume_report: "0",
          Nmonth_fixed: {
            previous_diff_plus: "0",
            fixed_deposit: "0",
            fixed_withdraw: "0",
            previous_diff_minus: "0",
            current_month: date,
            previous_month: "2024-01-29",
          },
          totalSpentToday: "0",
        },
        { status: 200 }
      );
    }

    const data = {
      date: date,
      availableAmount: -440000,
      expenseGoalAmount: 100000,
      totalSpentToday: 540000,
      category_consume_report: [
        {
          // 카테고리
          category: "카페",
          // 금액
          amount: 100000,
          // 비율
          rate: "73%",
        },
        {
          category: "수정",
          amount: 35552,
          rate: "26%",
        },
      ],
      expenditure_this_month: {
        // 소비 예측 리포트
        last_month_Amount: 450000, // 지출 예정 금액
        "1st_month_Amount": 90000, // 지출 금액
        goal_amount: 100000, // 지출 목표
        result_amount: 10000, // 사용 가능 금액
      },
      Nmonth_fixed: {
        previous_diff_plus: "+0",
        fixed_deposit: 0,
        fixed_withdraw: 360000,
        previous_diff_minus: "-360000",
        current_month: date,
        previous_month: "2024-01-02",
      },
      month_report: {
        current: 90000,
        second_previous: 30000,
        previous: 0,
      },
    };
    return HttpResponse.json(data, { status: 200 });
  }),

  http.post<object, GoalResponse>(
    `${DOMAIN}/report/set-amount`,
    async ({ request }) => {
      const { expenditure_amount } = await request.json();
      setLocalStorage(LOCAL_STORAGE_KEY_GOAL, expenditure_amount);
      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  // 자산관리
  http.get<{ user_id: string }>(
    `${DOMAIN}/asset/target-amount`,
    async ({ params }) => {
      const { user_id } = params;
      const goal = getLocalStorage<SavingGoal>(LOCAL_STORAGE_KEY_SAVING_GOAL, {
        goal_amount: {
          key_id: "1",
          user_id: user_id ?? "?",
          years_goal_amount: "?",
          months_goal_amount: "?",
        },
        personal_goal: {
          user_id: user_id ?? "?",
          goal_name: "?",
          goal_amount: "?",
          period: "?",
          month_amount: "?",
        },
      });
      await delay(1000);
      return HttpResponse.json(goal, { status: 200 });
    }
  ),

  http.post<object, setSavingGoalQuery>(
    `${DOMAIN}/asset/target-amount/set`,
    async ({ request }) => {
      const { user_id, years_goal_amount } = await request.json();
      const goal = getLocalStorage<SavingGoal>(LOCAL_STORAGE_KEY_SAVING_GOAL, {
        goal_amount: {
          key_id: "1",
          user_id: user_id ?? "?",
          years_goal_amount: "?",
          months_goal_amount: "?",
        },
        personal_goal: {
          user_id: user_id ?? "?",
          goal_name: "?",
          goal_amount: "?",
          period: "?",
          month_amount: "?",
        },
      });

      setLocalStorage(LOCAL_STORAGE_KEY_SAVING_GOAL, {
        ...goal,
        goal_amount: {
          key_id: (Number(goal.goal_amount.key_id) + 1).toString(),
          user_id: user_id,
          years_goal_amount: years_goal_amount,
          months_goal_amount: (Number(years_goal_amount) / 12).toString(),
        },
      });

      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.post<object, SetPersonalGoalQuery>(
    `${DOMAIN}/asset/personal-goal`,
    async ({ request }) => {
      const { user_id, personal_goal, goal_amount, period, month_amount } =
        await request.json();
      const goal = getLocalStorage<SavingGoal>(LOCAL_STORAGE_KEY_SAVING_GOAL, {
        goal_amount: {
          key_id: "1",
          user_id: user_id ?? "?",
          years_goal_amount: "?",
          months_goal_amount: "?",
        },
        personal_goal: {
          user_id: user_id ?? "?",
          goal_name: "?",
          goal_amount: "?",
          period: "?",
          month_amount: "?",
        },
      });

      setLocalStorage(LOCAL_STORAGE_KEY_SAVING_GOAL, {
        ...goal,
        personal_goal: {
          user_id: user_id,
          goal_name: personal_goal,
          goal_amount: goal_amount,
          period: period,
          month_amount: month_amount,
        },
      });

      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.get(`${DOMAIN}/asset/spend-goal/view`, async ({ request }) => {
    const goal = getLocalStorage<SpendingGoal>(
      LOCAL_STORAGE_KEY_SPENDING_GOAL,
      {}
    );

    await delay(1000);
    return HttpResponse.json(goal, { status: 200 });
  }),

  http.post<object, setSpendingGoal>(
    `${DOMAIN}/asset/spend-goal/set`,
    async ({ request }) => {
      const {
        user_id,
        start_date,
        end_date,
        regular,
        spend_goal_amount,
        is_batch,
      } = await request.json();
      const goal = getLocalStorage<SpendingGoal>(
        LOCAL_STORAGE_KEY_SPENDING_GOAL,
        {}
      );
      const result = {
        user_id: user_id,
        date: start_date,
        start_date: start_date,
        end_date: end_date,
        spend_goal_amount: spend_goal_amount,
        spend_amount: "0",
      };

      if (regular === "ON") {
        if (is_batch) {
          setLocalStorage(LOCAL_STORAGE_KEY_SPENDING_GOAL, {
            OnSpendAmount: result,
          });
        } else {
          setLocalStorage(LOCAL_STORAGE_KEY_SPENDING_GOAL, {
            ...goal,
            OnSpendAmount: result,
          });
        }
      } else {
        setLocalStorage(LOCAL_STORAGE_KEY_SPENDING_GOAL, {
          ...goal,
          offSpendAmount: result,
        });
      }

      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.get(`${DOMAIN}/asset/category-amount`, async () => {
    const assetsByCategory = getLocalStorage<AssetsByCategory>(
      LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY,
      INIT_ASSET_BY_CATEGORY
    );
    const goal = getLocalStorage<SpendingGoal>(
      LOCAL_STORAGE_KEY_SPENDING_GOAL,
      {}
    );
    const goalAmount = goal.OnSpendAmount
      ? goal.OnSpendAmount
      : goal.offSpendAmount;

    await delay(1000);
    return HttpResponse.json(
      {
        ...assetsByCategory,
        spend_goal_amount: goalAmount ? goalAmount.spend_goal_amount : "0",
      },
      { status: 200 }
    );
  }),

  http.post<object, setAssetByCategory>(
    `${DOMAIN}/asset/category-amount/set`,
    async ({ request }) => {
      const { date, medium_name, medium_value, small_map } =
        await request.json();
      const assetsByCategory = getLocalStorage<AssetsByCategory>(
        LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY,
        INIT_ASSET_BY_CATEGORY
      );
      const goal = getLocalStorage<SpendingGoal>(
        LOCAL_STORAGE_KEY_SPENDING_GOAL,
        {}
      );
      const goalAmount = goal.OnSpendAmount
        ? goal.OnSpendAmount
        : goal.offSpendAmount;
      const assetByCategory = {
        category_name: medium_name,
        category_total: medium_value,
        list: Object.keys(small_map).map((k) => {
          return { name: k, value: small_map[k] };
        }),
      };

      const result = {
        date: date,
        spend_goal_amount: goalAmount ? goalAmount.spend_goal_amount : "0",
        ratio: "0",
      };

      let newList: AssetByCategory[] = [];

      if (
        assetsByCategory.category_list.find(
          (l) => l.category_name === medium_name
        )
      ) {
        newList = assetsByCategory.category_list.map((l) =>
          l.category_name === medium_name ? assetByCategory : l
        );
      } else {
        newList = assetsByCategory.category_list.concat(assetByCategory);
      }
      const total = newList.reduce((result, curr) => {
        return result + Number(curr.category_total);
      }, 0);

      setLocalStorage(LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY, {
        ...result,
        category_list: newList,
        category_total: total.toString(),
        ratio: ((total / Number(result.spend_goal_amount)) * 100).toString(),
      });

      await delay(1000);
      return HttpResponse.json(true, { status: 200 });
    }
  ),

  http.delete(`${DOMAIN}/asset/category-amount/delete`, async () => {
    setLocalStorage(
      LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY,
      INIT_ASSET_BY_CATEGORY
    );
    await delay(1000);
    return HttpResponse.json(true, { status: 200 });
  }),
];
