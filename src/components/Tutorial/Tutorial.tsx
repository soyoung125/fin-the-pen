import { ReactNode, useState } from "react";
import Stepper from "components/common/Stepper";
import {
  CloseTutorialBtnContainer,
  Container,
  TutorialContainer,
} from "@components/Tutorial/Tutorial.styles.ts";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export interface ITutorial {
  tutorialPage: ReactNode;
  nextAction: () => void;
}

function Tutorial({ tutorials }: { tutorials: ITutorial[] }) {
  const [step, setStep] = useState(0);
  const handleClick = () => {
    tutorials[step].nextAction();
    if (step < tutorials.length - 1) {
      setStep((prev) => prev + 1);
    }
  };
  return (
    <Container onClick={handleClick}>
      <CloseTutorialBtnContainer>
        <ClearRoundedIcon />
      </CloseTutorialBtnContainer>
      <TutorialContainer>{tutorials[step].tutorialPage}</TutorialContainer>
      <Stepper size={tutorials.length} focused={step} />
    </Container>
  );
}

export default Tutorial;
