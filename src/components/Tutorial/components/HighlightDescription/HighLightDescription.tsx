import {
  ArrowIcon,
  Container,
  TextBox,
} from "@components/Tutorial/components/HighlightDescription/HighLightDescription.styles.ts";
import arrowUp from "@assets/icons/arrowUp.svg";
import arrowDown from "@assets/icons/arrowDown.svg";

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
      {position === "top" && <ArrowIcon src={arrowDown} alt="arrowDown" />}
    </Container>
  );
}

export { HighLightDescription };
