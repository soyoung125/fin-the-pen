import { Skeleton, Stack, Typography } from "@mui/material";

function ReportCategorySummarySkeleton() {
  return (
    <Stack py={3} px={2} spacing={2.5}>
      <Stack px={1} direction="row" justifyContent="space-between">
        <Typography component={"div"} fontSize="20px">
          <Skeleton width="40px" />
        </Typography>
        <Typography component={"div"} variant="h2">
          <Skeleton width="150px" />
        </Typography>
      </Stack>

      <Stack spacing={0.5}>
        <Skeleton variant="rectangular" height={32} />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={400}>
            <Skeleton width="100px" />
          </Typography>
          <Typography>
            <Skeleton width="100px" />
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ReportCategorySummarySkeleton;
