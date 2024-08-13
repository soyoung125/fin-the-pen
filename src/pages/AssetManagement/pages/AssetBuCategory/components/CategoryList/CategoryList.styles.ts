import styled from "@emotion/styled";

export const UnderlinedInput = styled.input<{
  $color?: string;
  $isShake?: boolean;
}>`
  border: none;
  outline: none;
  width: 150px;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: end;
  text-decoration-line: underline;
  text-underline-offset: 2px;
  background-color: ${({ $color }) => ($color ? $color : "#FFF")};
  text-decoration-color: ${({ $isShake }) => ($isShake ? "red" : "black")};
  animation: ${({ $isShake }) =>
    $isShake ? "horizontal-shaking 0.33s" : "none"};

  @keyframes horizontal-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export const UnderlinedInputBox = styled.div`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-grow: 1;
`;
