"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function ChartLoader () {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height={300}
    >
      <CircularProgress color='inherit' />
      <Typography color='inherit' variant='body2' sx={{ mt: 2 }}>
        Loading chart...
      </Typography>
    </Box>
  );
}
