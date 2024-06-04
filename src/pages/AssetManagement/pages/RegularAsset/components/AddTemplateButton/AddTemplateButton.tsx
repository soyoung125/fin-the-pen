import { Button } from "./AddTemplateButton.styles.ts";
import { BottomButtonContainer } from "@components/common/TodayButton/TodayButton.styles.ts";

export interface DeleteButtonProps {
  templateCount: number;
  clickAction: () => void;
}

function AddTemplateButton({ templateCount, clickAction }: DeleteButtonProps) {
  return (
    <BottomButtonContainer onClick={clickAction}>
      <Button>{`정기 템플릿 추가하기 ${templateCount}/10`}</Button>
    </BottomButtonContainer>
  );
}

export default AddTemplateButton;
