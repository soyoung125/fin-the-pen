import { Drawer, Stack } from "@mui/material";
import BackButton from "@components/layouts/common/TopBar/buttons/BackButton.tsx";
import Header from "@pages/Home/components/Onboarding/components/Header/Header.tsx";
import { FormEvent, useState } from "react";
import Footer from "@pages/Home/components/Onboarding/components/Footer/Footer.tsx";
import Body from "@pages/Home/components/Onboarding/components/Body/Body.tsx";
import useSavingGoal from "@hooks/assetManagement/useSavingGoal.ts";
import useSpendingGoal from "@hooks/assetManagement/useSpendingGoal.ts";

function Onboarding({ handleClose }: { handleClose: () => void }) {
  const [step, setStep] = useState(0);

  const { handleSetSavingGoal } = useSavingGoal();
  const { yearMonth, handleSetSpendingGoal } = useSpendingGoal();

  const defaultForm = {
    start_date: yearMonth,
    end_date: yearMonth,
    regular: "OFF" as const,
    is_batch: false,
  };

  const handleNext = () =>
    step < 1 ? setStep((prevState) => prevState + 1) : handleClose;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = event.currentTarget.amount.value.replaceAll(",", "");

    if (step === 0) {
      handleSetSavingGoal(Number(amount));
    } else if (step === 1) {
      handleSetSpendingGoal({
        ...defaultForm,
        spend_goal_amount: amount,
      });
    }
    handleNext();
  };

  return (
    <Drawer
      open={true}
      anchor="bottom"
      onClose={handleClose}
      sx={{
        height: "100dvh",
        ".MuiPaper-root.MuiDrawer-paper": {
          maxHeight: "100dvh",
          height: "100dvh",
        },
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit}
        justifyContent="space-between"
        alignItems="center"
        height="100dvh"
        width="100dvw"
      >
        <Stack
          px={2.5}
          py={1}
          width={"100%"}
          direction={"row"}
          justifyContent={"start"}
        >
          <BackButton handleClick={handleClose} />
        </Stack>

        <Header step={step} />

        <Body step={step} />

        <Footer step={step} handleNext={handleNext} />
      </Stack>
    </Drawer>
  );
}

export default Onboarding;
