import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import TemplateDrawer from "@components/TemplateDrawer";
import { Drawer } from "@mui/material";
import { Template } from "@app/types/template.ts";

export const useTemplateDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();

  const openDrawer = (setSelected: (t: Template) => void) => {
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
        <TemplateDrawer closeDrawer={closeOverlay} setSelected={setSelected} />
      </Drawer>
    );
  };

  return { openDrawer, closeDrawer: closeOverlay };
};
