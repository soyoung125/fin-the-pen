import { Box } from "@mui/material";
import React, { useRef } from "react";
import RoundedButton from "../../../../../common/RoundedButton.tsx";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import search from "@assets/icons/header/search.svg";

function SearchButton() {
  const navigate = useNavigate();
  const searchBtn = useRef(null);

  const handleClick = () => {
    navigate(PATH.searchSchedule);
  };

  return (
    <Box ref={searchBtn}>
      <RoundedButton value="user" onClick={handleClick}>
        <img src={search} alt="search" />
      </RoundedButton>
    </Box>
  );
}

export default SearchButton;
