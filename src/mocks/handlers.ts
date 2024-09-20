import { delay, http, HttpResponse } from "msw";
import {
  LOCAL_STORAGE_KEY_ASSETS_BY_CATEGORY,
  LOCAL_STORAGE_KEY_GOAL,
  LOCAL_STORAGE_KEY_SAVING_GOAL,
  LOCAL_STORAGE_KEY_SCHEDULES,
  LOCAL_STORAGE_KEY_SPENDING_GOAL,
  LOCAL_STORAGE_KEY_TEMPLATE,
  LOCAL_STORAGE_KEY_USERS,
} from "@api/keys.ts";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { DOMAIN } from "@api/url.ts";
import { MockUser, SignUp, User } from "@app/types/auth.ts";
import {
  HomeQuery,
  RequestSchedule,
  Schedule,
  WeeklySchedule,
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
import {
  ModifyTemplateRequest,
  ModifyTemplateSchedulesRequest,
  Template,
  TemplateScheduleRequest,
  TemplateSchedulesRequest,
} from "@app/types/template.ts";

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
      const prevTemplate = getLocalStorage<Template[]>(
        LOCAL_STORAGE_KEY_TEMPLATE,
        []
      );
      const isExist = prevSchedules.find(
        (s) => s.schedule_id === schedule.schedule_id
      );
      await delay(1000);

      if (isExist) {
        return HttpResponse.json(false, { status: 400 });
      }

      if (schedule.register_template) {
        const lastIdx = prevTemplate.length;
        const id = lastIdx === 0 ? -1 : prevTemplate[lastIdx - 1].id;
        console.log(id, prevTemplate[lastIdx - 1]);
        setLocalStorage(LOCAL_STORAGE_KEY_TEMPLATE, [
          ...prevTemplate,
          {
            id: id + 1,
            amount: Number(schedule.set_amount),
            category_name: schedule.category,
            statement: schedule.price_type === "+" ? "withdraw" : "deposit",
            template_name: schedule.event_name,
            user_id: schedule.user_id,
          },
        ]);
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
          period: {
            repeat_number_of_time: schedule.period.repeat_number_time,
            repeat_again: schedule.period.is_repeat_again,
            repeat_end_line: schedule.period.repeat_end_line,
          },
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
        moment(calendar_date).isSameOrAfter(schedule.start_date, "month") &&
        moment(calendar_date).isSameOrBefore(schedule.end_date, "month")
    );
    const { income, expense } = monthSchedules.reduce(
      (result, curr) => {
        if (curr.price_type === "+") {
          return { ...result, income: result.income + parseInt(curr.amount) };
        } else {
          return { ...result, expense: result.expense + parseInt(curr.amount) };
        }
      },
      { income: 0, expense: 0 }
    );

    await delay(1000);
    return HttpResponse.json(
      {
        income: income.toString(),
        available: "0",
        data: monthSchedules,
        expense: expense.toString(),
        count: monthSchedules.length,
      },
      { status: 200 }
    );
  }),

  http.post<object, HomeQuery>(`${DOMAIN}/home/week`, async ({ request }) => {
    const { user_id, calendar_date, main_month } = await request.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSameOrAfter(schedule.start_date, "month") &&
        moment(calendar_date).isSameOrBefore(schedule.end_date, "month")
    );

    const { income, expense } = monthSchedules.reduce(
      (result, curr) => {
        if (curr.price_type === "+") {
          return { ...result, income: result.income + parseInt(curr.amount) };
        } else {
          return { ...result, expense: result.expense + parseInt(curr.amount) };
        }
      },
      { income: 0, expense: 0 }
    );

    const selected = moment(`${main_month}-01`);
    const format = "YYYY-MM-DD";
    const lastDay = moment(`${main_month}-01`)
      .endOf("month")
      .format("YYYY-MM-DD");
    let count = 1;
    let result: WeeklySchedule[] = [];

    while (!selected.isSameOrAfter(lastDay, "date")) {
      const first = selected.day(1).format(format);
      const last = selected.day(7).format(format);

      const weekSchedules = monthSchedules.filter(
        (s) =>
          !(
            moment(s.start_date).isAfter(last, "date") ||
            moment(s.end_date).isBefore(first, "date")
          )
      );

      const { weekIncome, weekExpense } = weekSchedules.reduce(
        (result, curr) => {
          if (curr.price_type === "+") {
            return {
              ...result,
              weekIncome: result.weekIncome + parseInt(curr.amount),
            };
          } else {
            return {
              ...result,
              weekExpense: result.weekExpense + parseInt(curr.amount),
            };
          }
        },
        { weekIncome: 0, weekExpense: 0 }
      );
      result = [
        ...result,
        {
          week_of_number: `${count}주차`,
          period: `${first}~${last}`,
          plus: weekIncome,
          minus: weekExpense,
        },
      ];
      count += 1;
    }

    await delay(1000);
    return HttpResponse.json(
      {
        week_schedule: result,
        income: income.toString(),
        available: "0",
        expense: expense.toString(),
      },
      { status: 200 }
    );
  }),

  http.post<object, HomeQuery>(`${DOMAIN}/home/day`, async ({ request }) => {
    const { user_id, calendar_date } = await request.json();
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const daySchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(calendar_date).isSameOrAfter(schedule.start_date, "date") &&
        moment(calendar_date).isSameOrBefore(schedule.end_date, "date")
    );
    const { income, expense, expect } = daySchedules.reduce(
      (result, curr) => {
        const dateAndTime = `${curr.start_date} ${curr.start_time}`;
        if (moment().isBefore(dateAndTime)) {
          return { ...result, expect: result.expect + parseInt(curr.amount) };
        }
        if (curr.price_type === "+") {
          return { ...result, income: result.income + parseInt(curr.amount) };
        } else {
          return { ...result, expense: result.expense + parseInt(curr.amount) };
        }
      },
      { income: 0, expense: 0, expect: 0 }
    );

    await delay(1000);

    if (daySchedules.length === 0) {
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
        income: income.toString(),
        available: "0",
        dayExpense: expense.toString(),
        expect: expect.toString(),
        schedule_count: daySchedules.length,
      },
      { status: 200 }
    );
  }),

  http.get(`${DOMAIN}/report/month`, async ({ request }) => {
    const url = new URL(request.url);
    const user_id = url.searchParams.get("user_id");
    const date = url.searchParams.get("date");
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );
    const monthSchedules = schedules.filter(
      (schedule) =>
        schedule.user_id === user_id &&
        moment(date).isSameOrAfter(schedule.start_date, "month") &&
        moment(date).isSameOrBefore(schedule.end_date, "month")
    );
    await delay(1000);
    if (monthSchedules.length === 0) {
      return HttpResponse.json(
        {
          current_date: date,
          expenditure_data: {
            last_Nmonth_Amount: "0",
            first_Nmonth_Amount: "0",
            spend_amount: "0",
            available_Nmonth_amount: "0",
          },
          available_amount: 0,
          spend_amount: "0",
          monthly_report: {
            current_amount: 0,
            second_amount: 0,
            previous_amount: 0,
          },
          category_consume_list: "?",
          Nmonth_fixed: {
            diff_plus: "0",
            current_fixed_plus: 0,
            current_fixed_Minus: 0,
            diff_minus: "0",
            current_month: date,
            previous_month: "2024-01-29",
          },
          first_month_amount: "0",
        },
        { status: 200 }
      );
    }

    const data = {
      current_date: date,
      available_amount: -440000,
      spend_amount: 100000,
      first_month_amount: 540000,
      category_consume_list: [
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
      expenditure_data: {
        // 소비 예측 리포트
        last_Nmonth_Amount: 450000, // 지출 예정 금액
        first_Nmonth_Amount: 90000, // 지출 금액
        spend_amount: 100000, // 지출 목표
        available_Nmonth_amount: 10000, // 사용 가능 금액
      },
      Nmonth_fixed: {
        diff_plus: "+0",
        current_fixed_plus: 0,
        current_fixed_Minus: 360000,
        diff_minus: "-360000",
        current_month: date,
        previous_month: "2024-01-02",
      },
      monthly_report: {
        current_amount: 90000,
        second_amount: 30000,
        previous_amount: 0,
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

  http.get(`${DOMAIN}/asset/spend-goal/view`, async () => {
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

      let newList: AssetByCategory[];

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

  // 정기 템플릿 api
  http.post<object, TemplateScheduleRequest>(
    `${DOMAIN}/createSchedule/template`,
    async ({ request }) => {
      await delay(1000);
      const { template_id } = await request.json();
      const templates = getLocalStorage<Template[]>(
        LOCAL_STORAGE_KEY_TEMPLATE,
        []
      );
      const template = templates.find((t) => t.id === Number(template_id));

      if (!template) return HttpResponse.json(null, { status: 400 });

      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );
      return HttpResponse.json(
        schedules.find(
          (s) =>
            s.event_name === template.template_name &&
            s.category === template.category_name
        ),
        { status: 200 }
      );
    }
  ),

  http.get(`${DOMAIN}/template/is_exists`, async ({ request }) => {
    const url = new URL(request.url);
    const category_name = url.searchParams.get("category_name");
    const event_name = url.searchParams.get("event_name");
    await delay(1000);

    const templates = getLocalStorage<Template[]>(
      LOCAL_STORAGE_KEY_TEMPLATE,
      []
    );
    const schedules = getLocalStorage<Schedule[]>(
      LOCAL_STORAGE_KEY_SCHEDULES,
      []
    );

    const template = templates.find(
      (t) => t.category_name === category_name && t.template_name === event_name
    );
    if (!template) return HttpResponse.json(null, { status: 400 });

    const schedule = schedules.find(
      (s) =>
        s.event_name === template.template_name &&
        s.category === template.category_name
    );

    return HttpResponse.json(
      {
        template_data: {
          ...template,
          template_id: template.id,
        },
        schedule_data: schedule,
      },
      { status: 200 }
    );
  }),

  http.get(`${DOMAIN}/template/details`, async () => {
    await delay(1000);
    const templates = getLocalStorage<Template[]>(
      LOCAL_STORAGE_KEY_TEMPLATE,
      []
    );
    return HttpResponse.json(
      {
        data: templates,
      },
      { status: 200 }
    );
  }),

  http.get(`${DOMAIN}/asset/template/view`, async () => {
    await delay(1000);
    const templates = getLocalStorage<Template[]>(
      LOCAL_STORAGE_KEY_TEMPLATE,
      []
    );
    return HttpResponse.json(
      {
        deposit: templates.filter((t) => t.statement === "deposit"),
        withdraw: templates.filter((t) => t.statement === "withdraw"),
      },
      { status: 200 }
    );
  }),

  http.delete<object, { template_ids: number[] }>(
    `${DOMAIN}/asset/template/delete`,
    async ({ request }) => {
      const { template_ids } = await request.json();
      const templates = getLocalStorage<Template[]>(
        LOCAL_STORAGE_KEY_TEMPLATE,
        []
      );
      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );

      const deleteTemplates = templates.filter((t) =>
        template_ids.includes(t.id)
      );
      console.log(templates.filter((t) => !template_ids.includes(t.id)));
      setLocalStorage(
        LOCAL_STORAGE_KEY_TEMPLATE,
        templates.filter((t) => !template_ids.includes(t.id))
      );
      setLocalStorage(
        LOCAL_STORAGE_KEY_SCHEDULES,
        schedules.filter(
          (s) =>
            !deleteTemplates.find(
              (t) =>
                t.category_name === s.category &&
                t.template_name === s.event_name
            )
        )
      );

      await delay(10000);
      return HttpResponse.json({ status: 200 });
    }
  ),

  http.get<TemplateSchedulesRequest>(
    `${DOMAIN}/asset/template/schedule/info`,
    async ({ request }) => {
      const url = new URL(request.url);
      const template_id = url.searchParams.get("template_id");
      await delay(1000);
      const templates = getLocalStorage<Template[]>(
        LOCAL_STORAGE_KEY_TEMPLATE,
        []
      );
      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );

      const template = templates.find((t) => t.id === Number(template_id));

      return HttpResponse.json(
        {
          template,
          schedule: schedules.filter(
            (s) =>
              s.event_name === template?.template_name &&
              s.category === template?.category_name
          ),
        },
        { status: 200 }
      );
    }
  ),

  http.post<object, ModifyTemplateSchedulesRequest>(
    `${DOMAIN}/asset/template/modify/selected_schedule`,
    async ({ request }) => {
      const { schedule_id_list, amount, is_fixed, is_excluded, payment_type } =
        await request.json();
      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );

      const idList = schedule_id_list.split(",");

      setLocalStorage(
        LOCAL_STORAGE_KEY_SCHEDULES,
        schedules.map((s) =>
          idList.includes(s.schedule_id ?? "")
            ? { ...s, amount, is_fixed, is_excluded, payment_type }
            : s
        )
      );

      await delay(1000);

      return HttpResponse.json({ status: 200 });
    }
  ),

  http.post<object, ModifyTemplateRequest>(
    `${DOMAIN}/asset/template/modify`,
    async ({ request }) => {
      const { template_id, template_name, category_name } =
        await request.json();
      const templates = getLocalStorage<Template[]>(
        LOCAL_STORAGE_KEY_TEMPLATE,
        []
      );
      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );

      const template = templates.find((t) => t.id === Number(template_id));

      setLocalStorage(
        LOCAL_STORAGE_KEY_SCHEDULES,
        schedules.map((s) =>
          s.event_name === template?.template_name &&
          s.category === template.category_name
            ? { ...s, event_name: template_name, category: category_name }
            : s
        )
      );
      setLocalStorage(
        LOCAL_STORAGE_KEY_TEMPLATE,
        templates.map((t) =>
          t.id === Number(template_id)
            ? { ...t, category_name, template_name }
            : t
        )
      );

      await delay(1000);

      return HttpResponse.json({ status: 200 });
    }
  ),

  http.delete<object, { schedule_id_list: string }>(
    `${DOMAIN}/asset/template/delete/selected_schedule`,
    async ({ request }) => {
      const { schedule_id_list } = await request.json();
      const schedules = getLocalStorage<Schedule[]>(
        LOCAL_STORAGE_KEY_SCHEDULES,
        []
      );

      const idList = schedule_id_list.split(",");

      setLocalStorage(
        LOCAL_STORAGE_KEY_SCHEDULES,
        schedules.filter((s) => !idList.includes(s.schedule_id ?? ""))
      );

      await delay(1000);

      return HttpResponse.json({ status: 200 });
    }
  ),
];
