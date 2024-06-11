import { HeaderContainer } from "@components/TemplateDrawer/components/Header/Header.styles.ts";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Typography } from "@mui/material";

export interface ModifyHeaderProps {
  handleBack: () => void;
}

function ModifyHeader({ handleBack }: ModifyHeaderProps) {
  return (
    <HeaderContainer>
      <CloseRoundedIcon fontSize="small" onClick={handleBack} />
      <Typography variant="h2">삭제할 정기 템플릿을 선택해주세요.</Typography>
    </HeaderContainer>
  );
}

export default ModifyHeader;
