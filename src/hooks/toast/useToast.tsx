import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { ReactNode } from "react";
import Toast from "@hooks/toast/Toast.tsx";

export const useToast = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openToast = ({
    hideDuration,
    color,
    toastElement,
    actionsElement,
  }: {
    hideDuration: number;
    color: string;
    toastElement: ReactNode;
    actionsElement?: ReactNode;
  }) => {
    openOverlay(
      <Toast
        hideDuration={hideDuration}
        color={color}
        action={actionsElement}
        onClickClose={closeOverlay}
      >
        {toastElement}
      </Toast>
    );
  };

  return { openToast, closeToast: closeOverlay };
};
