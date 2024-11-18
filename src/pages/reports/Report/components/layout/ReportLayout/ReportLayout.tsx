import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export interface ReportLayoutProps {
  title: string;
  actionContent?: string;
  handleClick?: () => void;
  content?: ReactNode;
}

function ReportLayout({
  actionContent,
  handleClick,
  title,
  content,
}: ReportLayoutProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize="20px" fontWeight={700}>
          {title}
        </Typography>
        {actionContent && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            py={2}
            sx={{ fontSize: "14px", fontWeight: 500, color: "primary.main" }}
            onClick={handleClick}
          >
            <Box>{actionContent}</Box>
            <ArrowForwardIosIcon
              fontSize="inherit"
              sx={{ color: "secondary.dark" }}
            />
          </Stack>
        )}
      </Stack>
      <Box>{content}</Box>
    </Stack>
  );
}

export default ReportLayout;
