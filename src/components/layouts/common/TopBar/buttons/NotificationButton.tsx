import { useNavigate } from "react-router-dom";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";
import React from "react";
import IconSVG from "@components/common/IconSVG";

function NotificationButton() {
  const navigate = useNavigate();

  return (
    <RoundedButton
      value="notification"
      onClick={() => navigate(PATH.notification)}
    >
      <IconSVG id={"alarm"} size={24} />
    </RoundedButton>
  );
}

export default NotificationButton;
