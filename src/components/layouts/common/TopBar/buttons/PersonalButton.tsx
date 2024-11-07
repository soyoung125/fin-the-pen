import { useNavigate } from "react-router-dom";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";
import IconSVG from "@components/common/IconSVG";

function PersonalButton() {
  const navigate = useNavigate();

  return (
    <RoundedButton value="user" onClick={() => navigate(PATH.myPage)}>
      <IconSVG id={"user"} size={24} />
    </RoundedButton>
  );
}

export default PersonalButton;
