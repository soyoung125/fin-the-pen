import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import Loading from "@components/Loading";

export const useLoading = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openLoader = () => {
    openOverlay(<Loading />);
  };

  return { openLoader, closeLoader: closeOverlay };
};
