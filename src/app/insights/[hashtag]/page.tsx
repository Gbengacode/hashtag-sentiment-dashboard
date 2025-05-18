"use client";

import { use, Suspense, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Breadcrumbs,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import {
  useAllHashtagTrends,
  useHashtagTrend
} from "@/app/hooks/useHashtagTrend";
import ChartLoader from "@/app/components/common/ChartLoader";
import NextLink from "next/link";
const HashtagTrendCard = dynamic(
  () => import("@/app/components/charts/HashtagTrendCard"),
  {
    ssr: false,
    loading: () => <ChartLoader />
  }
);

export default function HashtagInsightPage ({
  params
}: {
  params: Promise<{ hashtag: string }>;
}) {
  const { hashtag } = use(params);

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentHashtag = useMemo(() => hashtag, [hashtag]);

  const { data, isLoading, error, refetch, isFetching } =
    useHashtagTrend(currentHashtag);

  const {
    data: allTagsData,
    error: allTagsError,
    isLoading: isAvailableTagsLoading
  } = useAllHashtagTrends();

  const tagList = useMemo(() => {
    if (!allTagsData?.trendData) return [];
    return Object.keys(allTagsData.trendData);
  }, [allTagsData]);

  const handleHashtagChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newHashtag = event.target.value;
      router.push(`/insights/${newHashtag}`);
    },
    [router]
  );

  return (
    <>
      <Box
        sx={[
          theme => ({
            backgroundColor: theme.vars.palette.grey[300],
            ...theme.applyStyles("dark", {
              backgroundColor: theme.vars.palette.grey[900]
            })
          })
        ]}
      >
        <Container maxWidth='lg' sx={{ py: { xs: 2, md: 10 } }}>
          <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
            <MuiLink
              component={NextLink}
              href='/'
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize='small' />
              Home
            </MuiLink>

            <MuiLink
              component={NextLink}
              href='/'
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TagIcon sx={{ mr: 0.5 }} fontSize='small' />
              Insights
            </MuiLink>

            <Typography
              color='text.primary'
              sx={{ display: "flex", alignItems: "center" }}
            >
              #{currentHashtag}
            </Typography>
          </Breadcrumbs>

          {/* Header and Selector */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              mb: 4,
              gap: 2
            }}
          >
            <Typography variant='h4' component='h1' fontWeight='bold'>
              Hashtag Sentiment Analysis
            </Typography>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id='hashtag-select-label'>Hashtag</InputLabel>
              <Select
                labelId='hashtag-select-label'
                value={currentHashtag}
                label='Hashtag'
                onChange={handleHashtagChange}
              >
                {isAvailableTagsLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : allTagsError ? (
                  <MenuItem disabled>Error loading tags</MenuItem>
                ) : tagList.length === 0 ? (
                  <MenuItem disabled>No tags found</MenuItem>
                ) : (
                  tagList.map(tag => (
                    <MenuItem key={tag} value={tag}>
                      #{tag}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>

          <Suspense fallback={<p>Loading chart...</p>}>
            <HashtagTrendCard
              isLoading={isLoading}
              error={error}
              hashtag={data?.hashtag || ""}
              range={data?.range || ""}
              trend={data?.trend || []}
            />
          </Suspense>

          {error && !isFetching && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1
              }}
            >
              <Typography color='error' variant='body1' fontWeight='medium'>
                {error.message}
              </Typography>
              <Button
                variant='contained'
                onClick={() => refetch()}
                size='large'
              >
                Retry
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
