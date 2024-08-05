import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import React from "react";
import OnBoarding from "@components/OnBorading";
import Tutorial from "@components/Tutorial";
import { getLocalStorage, setLocalStorage } from "@utils/storage.ts";
import { LOCAL_STORAGE_KEY_ONBOARDING } from "@api/keys.ts";

export const useOnBoarding = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const onBoarding = getLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
    onboarding: false,
    mainTutorial: false,
    drawerTutorial: false,
    reportTutorial: false,
  });

  const openOnBoarding = () => {
    const closeOnBoarding = () => {
      closeOverlay();
      setLocalStorage(LOCAL_STORAGE_KEY_ONBOARDING, {
        ...onBoarding,
        onboarding: true,
      });
    };

    openOverlay(<OnBoarding handleClose={closeOnBoarding} />);
  };

  const openTutorial = () => {
    openOverlay(<Tutorial />);
  };

  return {
    closeDrawer: closeOverlay,
    onboarding: onBoarding.onboarding,
    mainTutorial: onBoarding.mainTutorial,
    drawerTutorial: onBoarding.drawerTutorial,
    reportTutorial: onBoarding.reportTutorial,
    openOnBoarding,
  };
};
