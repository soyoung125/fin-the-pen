import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../../../common/RoundedButton.tsx";
import { PATH } from "@constants/path.ts";
import { selectGuestMode } from "@redux/slices/commonSlice.tsx";
import logo from "@assets/logos/logo_purple.png";
import { useAppSelector } from "@redux/hooks.ts";
import React from "react";

function LogoButton() {
  const navigate = useNavigate();
  const guestMode = useAppSelector(selectGuestMode);
  return (
    <RoundedButton value="logo" onClick={() => navigate(PATH.home)}>
      <img src={logo} alt="logo" width="40px" height="40px" />

      {guestMode && <Typography ml={1}>GUEST MODE</Typography>}
    </RoundedButton>
  );
}

export default LogoButton;
