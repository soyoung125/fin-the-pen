import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";
import { selectGuestMode } from "@redux/slices/commonSlice.tsx";
import logo from "@assets/logos/logo_purple.png";
import { useAppSelector } from "@redux/hooks.ts";

function LogoButton() {
  const navigate = useNavigate();
  const guestMode = useAppSelector(selectGuestMode);
  return (
    <RoundedButton value="user" onClick={() => navigate(PATH.home)}>
      <img src={logo} alt="" width="26px" height="26px" />
      {guestMode && <Typography ml={1}>GUEST MODE</Typography>}
    </RoundedButton>
  );
}

export default LogoButton;
