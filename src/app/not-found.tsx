"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFoundPage () {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={[
        theme => ({
          backgroundColor: theme.vars.palette.grey[300],
          ...theme.applyStyles("dark", {
            backgroundColor: theme.vars.palette.grey[900]
          }),
          color: theme.vars.palette.text.primary,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2
        })
      ]}
    >
      <Container maxWidth='sm' sx={{ textAlign: "center", py: 10 }}>
        <ErrorOutlineIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <Typography variant='h3' fontWeight='bold' gutterBottom>
          404 – Page Not Found
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
          Sorry, the page you are looking for doesn’t exist.
        </Typography>
        <Button
          component={Link}
          href='/'
          color='inherit'
          variant='contained'
          size={isMobile ? "medium" : "large"}
        >
          Go Back Home
        </Button>
      </Container>
    </Box>
  );
}
