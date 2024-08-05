import {
  ArrowIcon,
  ArrowIconContainer,
  Container,
  TextBox,
} from "@components/Tutorial/components/HighlightDescription/HighLightDescription.styles.ts";
import arrowUp from "@assets/icons/arrowUp.svg";
import arrowDown from "@assets/icons/arrowDown.svg";
import { Stack } from "@mui/material";

export interface HighLightDescriptionProps {
  position: "top" | "bottom";
  message: string;
  isCentered?: boolean;
}

function HighLightDescription({
  message,
  position,
  isCentered,
}: HighLightDescriptionProps) {
  return (
    <Container>
      {position === "bottom" && <ArrowIcon src={arrowUp} alt="arrowUp" />}
      <TextBox $isCenter={isCentered ?? false}>{message}</TextBox>
      {position === "top" &&
        (isCentered ? (
          <ArrowIconContainer>
            <ArrowIcon src={arrowDown} alt="arrowDown" />
            <ArrowIcon src={arrowDown} alt="arrowDown" />
          </ArrowIconContainer>
        ) : (
          <ArrowIcon src={arrowDown} alt="arrowDown" />
        ))}
    </Container>
  );
}

export { HighLightDescription };
