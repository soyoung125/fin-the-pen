import { Divider, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AppLocker from "@pages/Settings/components/display/AppLocker.tsx";
import Budget from "@pages/Settings/components/display/Budget.tsx";
import ThemeMode from "@pages/Settings/components/display/ThemeMode.tsx";
import Version from "./components/version/Version";
import Accordion from "@components/common/accordions/Accordion.tsx";
import AccordionSummary from "@components/common/accordions/AccordionSummary.tsx";
import AccordionDetails from "@components/common/accordions/AccordionDetails.tsx";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import { selectIsBudgetHidden } from "@redux/slices/settingSlice.ts";
import useHeader from "@hooks/useHeader.ts";
import ClickableListItem from "pages/Settings/components/ClickableListItem";
import {
  changeHeaderTitle,
  setIsAuthenticatedFalse,
} from "@redux/slices/commonSlice.tsx";
import { HEADER_MODE } from "@app/types/common.ts";
import PersonalCard from "@pages/Settings/components/PersonalCard";
import { useUser } from "@app/tanstack-query/useUser.ts";
import SearchInput from "@pages/Settings/components/SearchInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { findMenu } from "@pages/Settings/utils.ts";

export default function Settings() {
  const isHideBudgetMode = useAppSelector(selectIsBudgetHidden);
  const { data: user } = useUser();
  const dispatch = useAppDispatch();

  const [expends, setExpends] = useState<string[]>([]);
  const [value, setValue] = useState("");

  useHeader(true, HEADER_MODE.settings);

  useEffect(() => {
    if (isHideBudgetMode) {
      dispatch(setIsAuthenticatedFalse());
    }
    dispatch(changeHeaderTitle("설정"));
  }, []);

  const isInclude = (value: string) => expends.includes(value);

  const handleClickAccordion = (value: string) => {
    if (isInclude(value)) {
      setExpends(expends.filter((e) => e !== value));
    } else {
      setExpends(expends.concat(value));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickSearch = () => setExpends(findMenu(value));

  return (
    <>
      <Stack spacing={1.5} px={2.5} py={3}>
        <SearchInput
          placeholder="필요한 기능을 검색하세요."
          value={value}
          handleChange={handleChange}
          SearchIcon={<SearchRoundedIcon color="primary" />}
          handleClickSearch={handleClickSearch}
        />
        <PersonalCard name={user?.name} />
      </Stack>

      <Accordion
        expanded={isInclude("display")}
        onChange={() => handleClickAccordion("display")}
      >
        <AccordionSummary>
          <Typography>화면 설정</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ThemeMode />
          <Divider />
          <AppLocker />
          <Divider />
          <Budget />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={isInclude("secure")}
        onChange={() => handleClickAccordion("secure")}
      >
        <AccordionSummary>
          <Typography>보안</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClickableListItem to="/test" title="비밀번호 설정" subTitle="" />
          <Divider />
          <ClickableListItem to="/test" title="비밀번호 변경" subTitle="" />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={isInclude("alarm")}
        onChange={() => handleClickAccordion("alarm")}
      >
        <AccordionSummary>
          <Typography>알림</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClickableListItem to="/test" title="알림 데이터" subTitle="" />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={isInclude("connect")}
        onChange={() => handleClickAccordion("connect")}
      >
        <AccordionSummary>
          <Typography>연결관리</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClickableListItem to="/test" title="캘린더 연동" subTitle="" />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={isInclude("info")}
        onChange={() => handleClickAccordion("info")}
      >
        <AccordionSummary>
          <Typography>핀더펜 정보</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClickableListItem to="/test" title="공지사항" subTitle="" />
          <Divider />
          <ClickableListItem to="/test" title="인증서" subTitle="" />
          <Divider />
          <ClickableListItem to="/test" title="약관 및 졍책" subTitle="" />
          <Divider />
          <Version />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
