import React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

import SentimentChart from "./SentimentChart";
import TrendIndicator from "./TrendIndicator";

interface HashtagTrendCardProps {
  isLoading: boolean;
  error: Error | null;
  hashtag: string;
  range: string;
  trend: { date: string; sentiment: number }[];
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = React.memo(
  ({ isLoading, error, hashtag, range, trend }) => {
    const trendDirection = React.useMemo(() => {
      if (trend.length < 2) return "neutral";
      const firstSentiment = trend[0].sentiment;
      const lastSentiment = trend[trend.length - 1].sentiment;
      return lastSentiment > firstSentiment
        ? "up"
        : lastSentiment < firstSentiment
        ? "down"
        : "neutral";
    }, [trend]);

    if (isLoading) {
      return (
        <Card elevation={3} sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4 }}>
          <CardContent>
            <Skeleton variant='text' width='40%' height={40} />
            <Skeleton variant='text' width='20%' height={24} />
            <Skeleton variant='rectangular' height={300} />
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card elevation={3} sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4 }}>
          <CardContent>
            <Typography variant='h5' component='h2' gutterBottom color='error'>
              Error Loading Data
            </Typography>
            <Typography variant='body1' gutterBottom>
              {error.message || "Failed to load hashtag trend data."}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card elevation={3} sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4 }}>
        <CardContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={2}
          >
            <Box>
              <Typography variant='h5' component='h2' fontWeight='bold'>
                {hashtag}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {range}
              </Typography>
            </Box>
            <TrendIndicator direction={trendDirection} />
          </Box>

          <SentimentChart data={trend} />
        </CardContent>
      </Card>
    );
  }
);

HashtagTrendCard.displayName = "HashtagTrendCard";

export default HashtagTrendCard;
