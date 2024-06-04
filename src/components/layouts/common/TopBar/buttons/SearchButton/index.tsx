import { Box } from "@mui/material";
import React, { useRef } from "react";
import RoundedButton from "../../../../../common/RoundedButton.tsx";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import IconSVG from "@components/common/IconSVG";

function SearchButton() {
  const navigate = useNavigate();
  const searchBtn = useRef(null);

  const handleClick = () => {
    navigate(PATH.searchSchedule);
  };

  return (
    <Box ref={searchBtn}>
      <RoundedButton value="search" onClick={handleClick}>
        <IconSVG id={"search"} size={24} />
      </RoundedButton>
    </Box>
  );
}

export default SearchButton;
