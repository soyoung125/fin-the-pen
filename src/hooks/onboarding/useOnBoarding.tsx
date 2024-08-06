import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import React from "react";
import OnBoarding from "@components/OnBorading";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { LOCAL_STORAGE_KEY_ONBOARDING } from "@api/keys.ts";
import HomeTutorial from "@pages/Home/HomeTutorial.tsx";
import ScheduleDrawerTutorial from "@components/ScheduleDrawer/ScheduleDrawerTutorial.tsx";
import { useSwipeableDrawer } from "@hooks/useSwipeableDrawer.tsx";

export const useOnBoarding = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const { openDrawer, closeDrawer } = useSwipeableDrawer();
  const onBoarding = getLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
    onboarding: false,
    mainTutorial: false,
    drawerTutorial: false,
    reportTutorial: false,
  });

  const clearTutorial = (tutorial: "main" | "drawer" | "report") => {
    closeOverlay();
    switch (tutorial) {
      case "main":
        setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
          ...onBoarding,
          mainTutorial: true,
        });
        break;
      case "drawer":
        setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
          ...onBoarding,
          drawerTutorial: true,
        });
        break;
      case "report":
        setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
          ...onBoarding,
          reportTutorial: true,
        });
        break;
    }
  };

  const openOnBoarding = () => {
    const closeOnBoarding = () => {
      closeOverlay();
      setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
        ...onBoarding,
        onboarding: true,
      });
    };

    return new Promise((resolve) => {
      return openOverlay(
        <OnBoarding
          handleClose={() => {
            resolve(true);
            closeOnBoarding();
          }}
        />
      );
    });
  };

  const openMainTutorial = () => {
    // const closeMainTutorial = () => {
    //   closeOverlay();
    //   setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
    //     ...onBoarding,
    //     mainTutorial: true,
    //   });
    // };

    openOverlay(<HomeTutorial closeTutorial={() => clearTutorial("main")} />);
  };

  const openDrawerTutorial = () => {
    const closeDrawerTutorial = () => {
      closeDrawer();
      setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
        ...onBoarding,
        drawerTutorial: true,
      });
    };
    return new Promise((resolve) => {
      return openDrawer(
        <ScheduleDrawerTutorial
          closeTutorial={() => {
            resolve(true);
            closeDrawerTutorial();
          }}
        />
      );
    });
  };

  return {
    closeDrawer: closeOverlay,
    onboarding: onBoarding.onboarding,
    mainTutorial: onBoarding.mainTutorial,
    drawerTutorial: onBoarding.drawerTutorial,
    reportTutorial: onBoarding.reportTutorial,
    openOnBoarding,
    openMainTutorial,
    openDrawerTutorial,
    clearTutorial,
  };
};
