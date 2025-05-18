"use client";
import { useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  useTheme,
  useMediaQuery
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import HomeIcon from "@mui/icons-material/Home";
import { useAllHashtagTrends } from "@/app/hooks/useHashtagTrend";

export default function HomePage () {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data: allTagsData,
    error: allTagsError,
    isLoading: isAvailableTagsLoading
  } = useAllHashtagTrends();
  const tagList = useMemo(() => {
    if (!allTagsData?.trendData) return [];
    return Object.keys(allTagsData.trendData);
  }, [allTagsData]);

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 10
        })
      ]}
    >
      <Container maxWidth='md' sx={{ textAlign: "center" }}>
        <HomeIcon color='inherit' sx={{ fontSize: 50, mb: 1 }} />
        <Typography variant='h3' component='h1' fontWeight='bold' gutterBottom>
          Hashtag Sentiment Insights
        </Typography>
        <Typography variant='h6' color='text.secondary' mb={4}>
          Track the sentiment trends of your favorite tech hashtags over time.
          Select a tag, view the chart, and explore how opinions evolve.
        </Typography>

        <Button
          variant='contained'
          size='large'
          color='inherit'
          component={Link}
          href='/insights/react'
          startIcon={<TagIcon />}
          sx={{ mb: 4 }}
        >
          Explore Insights
        </Button>

        <Typography variant='subtitle1' color='text.secondary' mb={2}>
          Trending Now:
        </Typography>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent='center'
          alignItems='center'
        >
          {isAvailableTagsLoading ? (
            <Button disabled>Loading...</Button>
          ) : allTagsError ? (
            <Button disabled>Error loading tags</Button>
          ) : tagList.length === 0 ? (
            <Button disabled>No tags found</Button>
          ) : (
            tagList.map(tag => (
              <Button
                key={tag}
                component={Link}
                href={`/insights/${tag}`}
                variant='outlined'
                size='medium'
                color='inherit'
              >
                #{tag}
              </Button>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
}
