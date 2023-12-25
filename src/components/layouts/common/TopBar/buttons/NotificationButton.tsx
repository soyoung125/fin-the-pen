import { useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";

function NotificationButton() {
  const navigate = useNavigate();

  return (
    <RoundedButton
      value="notification"
      onClick={() => navigate(PATH.notification)}
    >
      <NotificationsOutlinedIcon />
    </RoundedButton>
  );
}

export default NotificationButton;