import {
  Box, Grid, ListItem, Stack,
} from '@mui/material';

function AnalysisListItem({ category, rank }) {
  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid xs={2} item>
          <Box display="flex" justifyContent="flex-end">
            {rank}
            st
          </Box>
        </Grid>
        <Grid xs={4} item>
          <Stack direction="row" alignItems="stretch" sx={{ paddingX: 1, borderRadius: 2, backgroundColor: 'primary.light' }}>
            <Box
              sx={{
                width: '15px', height: '15px', border: '4px solid', borderRadius: 3, borderColor: 'primary.dark', marginY: 'auto', marginRight: 0.5,
              }}
            />
            {category.label}
          </Stack>
        </Grid>
        <Grid xs={6} item>
          <Box>{category.value.toLocaleString('ko-KR')}</Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default AnalysisListItem;
