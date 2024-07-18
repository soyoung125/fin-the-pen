import {
  CategoryContainer,
  CategoryText,
  EventNameInput,
  FormContainerBox,
} from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FormContainer/FormContainer.styles.ts";
import FormCard from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FromCard";
import CategoryIconSVG from "@components/common/CategoryIconSVG";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { ChangeEvent } from "react";

export interface FormContainerProps {
  template_name: string;
  category: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

function formContainer({
  template_name,
  category,
  handleChange,
  handleClick,
}: FormContainerProps) {
  return (
    <FormContainerBox>
      <FormCard title="일정명">
        <EventNameInput value={template_name} onChange={handleChange} />
      </FormCard>
      <FormCard title="일정명">
        <CategoryContainer>
          <CategoryIconSVG id={category} size={22} />
          <CategoryText>{category}</CategoryText>
          <KeyboardArrowDownRoundedIcon color="primary" />
        </CategoryContainer>
      </FormCard>
    </FormContainerBox>
  );
}

export default formContainer;
