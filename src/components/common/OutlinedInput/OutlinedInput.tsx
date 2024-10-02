import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Container,
  Input,
} from "@components/common/OutlinedInput/OutlinedInput.styles.ts";

interface OutlinedInputProps extends ComponentPropsWithoutRef<"input"> {
  endAdornment?: ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
}

function OutlinedInput({
  endAdornment,
  inputRef,
  ...props
}: OutlinedInputProps) {
  return (
    <Container>
      <Input {...props} ref={inputRef} />
      {endAdornment}
    </Container>
  );
}

export default OutlinedInput;
