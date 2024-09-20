import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import ScheduleChangeModal from "@components/ScheduleDrawer/hooks/ScheduleChangeModal/ScheduleChangeModal.tsx";

export const useScheduleChangeModal = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openModal = ({
    changeMode,
  }: {
    changeMode: "수정" | "삭제";
  }): Promise<string | boolean> => {
    return new Promise((resolve) => {
      openOverlay(
        <ScheduleChangeModal
          changeMode={changeMode}
          onClickReject={() => {
            resolve(false);
            closeOverlay();
          }}
          onClickOnlyNow={() => {
            resolve("none");
            closeOverlay();
          }}
          onClickAll={() => {
            resolve("all");
            closeOverlay();
          }}
          onClickNowFromAfter={() => {
            resolve("nowFromAfter");
            closeOverlay();
          }}
        />
      );
    });
  };

  return { openModal };
};
