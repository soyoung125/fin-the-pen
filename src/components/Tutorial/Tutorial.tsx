import { MouseEvent, ReactNode } from "react";
import Stepper from "components/common/Stepper";
import {
  CloseTutorialBtnContainer,
  Container,
  TutorialContainer,
} from "@components/Tutorial/Tutorial.styles.ts";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Portal } from "@mui/material";

export interface ITutorial {
  tutorialPage: ReactNode;
  nextAction: () => void;
}

interface ITutorialProps {
  tutorials: ITutorial[];
  step: number;
  handleClose: () => void;
}

function Tutorial({ tutorials, step, handleClose }: ITutorialProps) {
  const size = tutorials.length;

  const handleClick = () => {
    tutorials[step].nextAction();
  };

  const handleClickClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClose();
  };

  return (
    <Portal>
      <Container onClick={handleClick}>
        <CloseTutorialBtnContainer onClick={handleClickClose}>
          <ClearRoundedIcon />
        </CloseTutorialBtnContainer>
        <TutorialContainer>{tutorials[step].tutorialPage}</TutorialContainer>
        {size > 1 && <Stepper size={size} focused={step} />}
      </Container>
    </Portal>
  );
}

export default Tutorial;
