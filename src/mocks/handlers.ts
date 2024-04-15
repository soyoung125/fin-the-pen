// src/mocks/handlers.js
import { rest } from "msw";
import {
  LOCAL_STORAGE_KEY_GOAL,
  LOCAL_STORAGE_KEY_SAVING_GOAL,
  LOCAL_STORAGE_KEY_SCHEDULES,
  LOCAL_STORAGE_KEY_SPENDING_GOAL,
  LOCAL_STORAGE_KEY_USERS,
} from "@api/keys.ts";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { DOMAIN } from "@api/url.ts";
import { MockUser, SignUp, User } from "@app/types/auth.ts";
import { Schedule } from "@app/types/schedule.ts";
import moment from "moment";
import { SavingGoal, SpendingGoal } from "@app/types/asset.ts";

const getSign = (type: string) => (type === "Plus" ? "+" : "-");

export const handlers = [
  rest.post(`${DOMAIN}/sign-up`, async (req, res, ctx) => {
    type MockUser = User & { password: string };

    const newUser: MockUser = await req.json();
    const prevUsers = getLocalStorage<MockUser[]>(LOCAL_STORAGE_KEY_USERS, []);

    if (prevUsers.find((user) => user.user_id === newUser.user_id)) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json(false));
    }

    const newUsers: MockUser[] = [...prevUsers, newUser];

    setLocalStorage(LOCAL_STORAGE_KEY_USERS, newUsers);

    return res(ctx.delay(1000), ctx.status(200), ctx.json(newUser));
  }),

  rest.post(`${DOMAIN}/sign-in`, async (req, res, ctx) => {
    const credentials: SignUp = await req.json();
    const users = getLocalStorage<MockUser[]>(LOCAL_STORAGE_KEY_USERS, []);
    const user = users.find(
      (user) =>
        user.user_id === credentials.user_id &&
        user.password === credentials.password
    );
    if (user === undefined) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json(""));
    }

    const randomEightDigit = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...user, token: randomEightDigit })
    );
  }),

  rest.post(`${DOMAIN}/createSchedule`, async (req, res, ctx) => {
    const schedule = await req.json();
    const prevSchedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const isExist = prevSchedules.find(
      (s) => s.schedule_id === schedule.schedule_id
    );
    if (isExist) {
      return res(ctx.delay(1000), ctx.status(400), ctx.json(false));
    }
    const repeatType = schedule.repeat.kind_type;
    const newSchedules: Schedule[] = [
      ...prevSchedules,
      {
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
      },
    ];
    setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.delete(`${DOMAIN}/deleteSchedule`, async (req, res, ctx) => {
    const { schedule_id } = await req.json();
    const prevSchedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const newSchedules = prevSchedules.filter(
      (schedule) => schedule.schedule_id !== schedule_id
    );
    setLocalStorage(LOCAL_STORAGE_KEY_SCHEDULES, newSchedules);
    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post(`${DOMAIN}/modifySchedule`, async (req, res, ctx) => {
    const schedule = await req.json();

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
    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post(`${DOMAIN}/home/month`, async (req, res, ctx) => {
    const { user_id, calendar_date } = await req.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSame(schedule.start_date, "month")
    );
    if (monthSchedules.length === 0) {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          income: "0",
          available: "0",
          data: [],
          expense: "0",
          count: 0,
        })
      );
    }
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        income: "10000",
        available: "2000",
        data: monthSchedules,
        expense: "8000",
        count: monthSchedules.length,
      })
    );
  }),

  rest.post(`${DOMAIN}/home/week`, async (req, res, ctx) => {
    // const { user_id, calendar_date } = await req.json();
    // const schedules = getLocalStorage<Schedule[]>(
    //   LOCAL_STORAGE_KEY_SCHEDULES,
    //   []
    // );
    // const monthSchedules = schedules.filter(
    //   (schedule) =>
    //     schedule.user_id === user_id &&
    //     moment(calendar_date).isSame(schedule.start_date, "month")
    // );
    // if (monthSchedules.length === 0) {
    //   return res(ctx.delay(1000), ctx.status(400));
    // }
    // return res(
    //   ctx.delay(1000),
    //   ctx.status(200),
    //   ctx.json({
    //     income: "10000",
    //     available: "2000",
    //     expense: "8000",
    //   })
    // );
    return res(ctx.delay(1000), ctx.status(400));
  }),

  rest.post(`${DOMAIN}/home/day`, async (req, res, ctx) => {
    const { user_id, calendar_date } = await req.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSame(schedule.start_date, "month")
    );
    if (monthSchedules.length === 0) {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          income: "0",
          available: "0",
          dayExpense: "0",
          expect: "0",
          schedule_count: 0,
        })
      );
    }
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        income: "10000",
        available: "1000",
        dayExpense: "8000",
        expect: "1000",
        schedule_count: monthSchedules.length,
      })
    );
  }),

  rest.get(`${DOMAIN}/report/month`, async (req, res, ctx) => {
    const user_id = req.url.searchParams.get("user_id");
    const date = req.url.searchParams.get("date");
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(date).isSame(schedule.start_date, "month")
    );

    if (monthSchedules.length === 0) {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
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
        })
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
    return res(ctx.delay(1000), ctx.status(200), ctx.json(data));
  }),

  rest.post(`${DOMAIN}/report/set-amount`, async (req, res, ctx) => {
    const { expenditure_amount } = await req.json();
    setLocalStorage(LOCAL_STORAGE_KEY_GOAL, expenditure_amount);
    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post(`${DOMAIN}/report/inquiry`, async (req, res, ctx) => {
    const { user_id, date } = await req.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(date).isSame(schedule.start_date, "month")
    );

    if (monthSchedules.length === 0) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json({ data: [] }));
    }

    const data = [
      {
        amount: 20000,
        rate: "20",
        category: "식비",
      },
      {
        amount: 12000,
        rate: "12",
        category: "미용",
      },
      {
        amount: 8000,
        rate: "8",
        category: "자동차",
      },
      {
        amount: 7000,
        rate: "7",
        category: "패션/쇼핑",
      },
      {
        amount: 6000,
        rate: "6",
        category: "카페",
      },
      {
        amount: 5000,
        rate: "5",
        category: "식비",
      },
      {
        amount: 4000,
        rate: "4",
        category: "식비",
      },
    ];
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ data: data }));
  }),

  // 자산관리
  rest.get(`${DOMAIN}/asset/target-amount`, async (req, res, ctx) => {
    const user_id = req.url.searchParams.get("user_id");
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

    return res(ctx.delay(1000), ctx.status(200), ctx.json(goal));
  }),

  rest.post(`${DOMAIN}/asset/target-amount/set`, async (req, res, ctx) => {
    const { user_id, years_goal_amount } = await req.json();
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

    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.post(`${DOMAIN}/asset/personal-goal`, async (req, res, ctx) => {
    const { user_id, personal_goal, goal_amount, period, month_amount } =
      await req.json();
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

    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),

  rest.get(`${DOMAIN}/asset/spend-goal/view`, async (req, res, ctx) => {
    const goal = getLocalStorage<SpendingGoal>(
      LOCAL_STORAGE_KEY_SPENDING_GOAL,
      {}
    );

    return res(ctx.delay(1000), ctx.status(200), ctx.json(goal));
  }),

  rest.post(`${DOMAIN}/asset/spend-goal/set`, async (req, res, ctx) => {
    const {
      user_id,
      start_date,
      end_date,
      regular,
      spend_goal_amount,
      is_batch,
    } = await req.json();
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

    return res(ctx.delay(1000), ctx.status(200), ctx.json(true));
  }),
];
