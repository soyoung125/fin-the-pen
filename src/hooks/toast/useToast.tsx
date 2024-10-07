import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { ReactNode } from "react";
import Toast from "@hooks/toast/Toast.tsx";

export const useToast = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openToast = ({
    hideDuration,
    color,
    toastText,
    actionsElement,
  }: {
    hideDuration: number;
    color: string;
    toastText: string;
    actionsElement?: ReactNode;
  }) => {
    console.log(color);
    openOverlay(
      <Toast
        hideDuration={hideDuration}
        color={color}
        action={actionsElement}
        onClickClose={closeOverlay}
        text={toastText}
      />
    );
  };

  return { openToast, closeToast: closeOverlay };
};
