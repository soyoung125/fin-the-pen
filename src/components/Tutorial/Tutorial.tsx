import { useState } from "react";
import Stepper from "components/common/Stepper";
import {
  CloseTutorialBtnContainer,
  Container,
} from "@components/Tutorial/Tutorial.styles.ts";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function Tutorial() {
  const [step, setStep] = useState(0);
  const handleClick = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <Container onClick={handleClick}>
      <CloseTutorialBtnContainer>
        <ClearRoundedIcon />
      </CloseTutorialBtnContainer>
      <Stepper size={4} focused={step} />
    </Container>
  );
}

export default Tutorial;
