import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import React from "react";
import OnBoardingTutorial from "@components/OnBorading";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { LOCAL_STORAGE_KEY_ONBOARDING } from "@api/keys.ts";
import HomeTutorial from "@pages/Home/HomeTutorial.tsx";
import ScheduleDrawerTutorial from "@components/ScheduleDrawer/ScheduleDrawerTutorial.tsx";
import { useSwipeableDrawer } from "@hooks/useSwipeableDrawer.tsx";
import ReportTutorial from "@pages/reports/Report/ReportTutorial.tsx";
import OnBoarding from "@pages/Home/components/Onboarding";

export const useOnBoarding = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const { openDrawer, closeDrawer } = useSwipeableDrawer();
  const onBoarding = getLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
    onboarding: false,
    onboardingTutorial: false,
    mainTutorial: false,
    drawerTutorial: false,
    templateTutorial: false,
    reportTutorial: false,
  });

  const clearTutorial = (
    tutorial:
      | "onboarding"
      | "onboardingTutorial"
      | "mainTutorial"
      | "drawerTutorial"
      | "templateTutorial"
      | "reportTutorial"
  ) => {
    closeOverlay();
    switch (tutorial) {
      case "drawerTutorial":
      case "templateTutorial":
        closeDrawer();
        break;
      default:
        closeOverlay();
    }
    setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
      ...onBoarding,
      [tutorial]: true,
    });
  };

  const openOnBoarding = () => {
    return new Promise((resolve) => {
      return openOverlay(
        <OnBoarding
          handleClose={() => {
            resolve(true);
            clearTutorial("onboarding");
          }}
        />
      );
    });
  };

  const openOnBoardingTutorial = () => {
    openOverlay(
      <OnBoardingTutorial
        handleClose={() => {
          clearTutorial("onboardingTutorial");
        }}
      />
    );
  };

  const openMainTutorial = () => {
    openOverlay(
      <HomeTutorial closeTutorial={() => clearTutorial("mainTutorial")} />
    );
  };

  const openDrawerTutorial = () => {
    return new Promise((resolve) => {
      return openDrawer(
        <ScheduleDrawerTutorial
          closeTutorial={() => {
            resolve(true);
            clearTutorial("drawerTutorial");
          }}
        />
      );
    });
  };

  const openTemplateTutorial = () => {
    return new Promise((resolve) => {
      return openDrawer(
        <ScheduleDrawerTutorial
          closeTutorial={() => {
            resolve(true);
            clearTutorial("templateTutorial");
          }}
          isTemplate
        />
      );
    });
  };

  const openReportTutorial = () => {
    openOverlay(
      <ReportTutorial closeTutorial={() => clearTutorial("reportTutorial")} />
    );
  };

  return {
    closeDrawer: closeOverlay,
    onboarding: onBoarding.onboarding,
    onboardingTutorial: onBoarding.onboardingTutorial,
    mainTutorial: onBoarding.mainTutorial,
    drawerTutorial: onBoarding.drawerTutorial,
    templateTutorial: onBoarding.templateTutorial,
    reportTutorial: onBoarding.reportTutorial,
    openOnBoarding,
    openOnBoardingTutorial,
    openMainTutorial,
    openDrawerTutorial,
    openTemplateTutorial,
    openReportTutorial,
  };
};
