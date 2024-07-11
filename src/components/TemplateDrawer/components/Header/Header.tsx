import { Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HeaderContainer } from "@components/TemplateDrawer/components/Header/Header.styles.ts";
import SelectMenus from "@components/common/SelectMenus";

export interface HeaderProps {
  closeAction: () => void;
  handleModify: (v: string) => void;
}

function Header({ closeAction, handleModify }: HeaderProps) {
  const options = ["삭제", "관리"];

  return (
    <HeaderContainer>
      <ArrowBackIosRoundedIcon onClick={closeAction} fontSize="small" />
      <Typography variant="h2" flexGrow={1}>
        정기 템플릿 리스트
      </Typography>
      <SelectMenus
        options={options}
        selectedOption={<MoreVertIcon />}
        setSelectedOption={(v) => handleModify(v)}
      />
    </HeaderContainer>
  );
}

export default Header;
