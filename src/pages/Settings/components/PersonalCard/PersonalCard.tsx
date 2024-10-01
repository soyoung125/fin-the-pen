import { CardContainer } from "@pages/Settings/components/PersonalCard/PersonalCard.styles.ts";
import { Avatar, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";

export interface PersonalCardProps {
  name?: string;
}

function PersonalCard({ name }: PersonalCardProps) {
  const navigate = useNavigate();

  const navigateToSignIn = () => navigate(PATH.signIn());
  const navigateToMyPage = () => navigate(PATH.myPage);

  return (
    <CardContainer onClick={name ? navigateToMyPage : navigateToSignIn}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ width: 50, height: 50 }}>
          <PersonIcon sx={{ fontSize: "35px" }} />
        </Avatar>
        <Stack>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            {name ? name : "로그인"}
          </Typography>
          <Typography variant="button" color="secondary.dark">
            내 정보 수정하기
          </Typography>
        </Stack>
      </Stack>
      <ArrowForwardIosRoundedIcon sx={{ fontSize: "20px" }} />
    </CardContainer>
  );
}

export default PersonalCard;
