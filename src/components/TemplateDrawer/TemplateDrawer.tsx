import { Drawer } from "@mui/material";
import { useState } from "react";
import {
  Header,
  ModifyHeader,
} from "@components/TemplateDrawer/components/Header";

export interface TemplateDrawerProps {
  closeDrawer: () => void;
}

function TemplateDrawer({ closeDrawer }: TemplateDrawerProps) {
  const [isModify, setIsModify] = useState(false);

  if (isModify) {
    return (
      <>
        <ModifyHeader handleBack={() => setIsModify(false)} />
      </>
    );
  }

  return (
    <>
      <Header
        closeAction={closeDrawer}
        handleModify={() => setIsModify(true)}
      />
    </>
  );
}

export default TemplateDrawer;
