import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import TemplateDrawer from "@components/TemplateDrawer";
import { Drawer } from "@mui/material";

export const useTemplateDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openDrawer = () => {
    openOverlay(
      <Drawer
        open={true}
        anchor="bottom"
        onClose={closeOverlay}
        sx={{
          height: "100dvh",
          ".MuiPaper-root.MuiDrawer-paper": {
            maxHeight: "100dvh",
            height: "100dvh",
          },
        }}
      >
        <TemplateDrawer closeDrawer={closeOverlay} />
      </Drawer>
    );
  };

  return { openDrawer, closeDrawer: closeOverlay };
};
