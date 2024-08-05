import { Stack, Typography } from "@mui/material";
import logo from "@assets/logos/logo_purple.png";
import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function Header({ onClickHandler }: { onClickHandler: () => void }) {
  return (
    <Stack
      direction="row"
      px={2.5}
      justifyContent="space-between"
      alignItems="center"
      height="40px"
      width="100dvw"
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <img src={logo} alt="logo" width="40px" height="40px" />
        <Typography variant="h4" color="primary">
          핀더펜
        </Typography>
      </Stack>
      <ClearRoundedIcon onClick={onClickHandler} />
    </Stack>
  );
}

export default Header;
