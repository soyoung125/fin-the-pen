import { Stack, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import delete_icon from "@assets/icons/delete_secondary.svg";
import { HeaderContainer } from "@components/TemplateDrawer/components/Header/Header.styles.ts";

export interface HeaderProps {
  closeAction: () => void;
  handleModify: () => void;
}

function Header({ closeAction, handleModify }: HeaderProps) {
  return (
    <HeaderContainer>
      <ArrowBackIosRoundedIcon onClick={closeAction} fontSize="small" />
      <Typography variant="h2" flexGrow={1}>
        정기 템플릿 리스트
      </Typography>
      <img src={delete_icon} alt="delete" onClick={handleModify} />
    </HeaderContainer>
  );
}

export default Header;
