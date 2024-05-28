import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import IconSVG from "@components/common/IconSVG";

function PersonalButton() {
  const navigate = useNavigate();
  const { data: user } = useUser();

  if (!user) {
    return (
      <RoundedButton value="login" onClick={() => navigate(PATH.signIn)}>
        <LoginIcon />
      </RoundedButton>
    );
  }

  return (
    <RoundedButton value="user" onClick={() => navigate(PATH.myPage)}>
      <IconSVG id={"user"} size={24} />
    </RoundedButton>
  );
}

export default PersonalButton;
