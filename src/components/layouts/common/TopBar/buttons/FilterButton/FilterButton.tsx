import React, { useState } from "react";
import RoundedButton from "../../../../../common/RoundedButton.tsx";
import FilterDrawer from "@components/layouts/common/TopBar/buttons/FilterButton/FilterDrawer.tsx";
import IconSVG from "@components/common/IconSVG";

function FilterButton() {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  return (
    <>
      <RoundedButton value="filter" onClick={() => setBottomDrawerOpen(true)}>
        <IconSVG id={"filter-main"} size={24} />
      </RoundedButton>
      <FilterDrawer
        bottomDrawerOpen={bottomDrawerOpen}
        setBottomDrawerOpen={setBottomDrawerOpen}
      />
    </>
  );
}

export default FilterButton;
