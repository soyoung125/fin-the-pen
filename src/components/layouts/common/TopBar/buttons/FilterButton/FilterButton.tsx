import React, { useState } from "react";
import RoundedButton from "../../../../../common/RoundedButton.tsx";
import FilterDrawer from "@components/layouts/common/TopBar/buttons/FilterButton/FilterDrawer.tsx";
import filter_main from "@assets/icons/header/filter_main.svg";

function FilterButton() {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  return (
    <>
      <RoundedButton value="filter" onClick={() => setBottomDrawerOpen(true)}>
        <img src={filter_main} alt="filter" />
      </RoundedButton>
      <FilterDrawer
        bottomDrawerOpen={bottomDrawerOpen}
        setBottomDrawerOpen={setBottomDrawerOpen}
      />
    </>
  );
}

export default FilterButton;
