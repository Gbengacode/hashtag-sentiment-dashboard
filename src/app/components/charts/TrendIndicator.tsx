import React from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

interface TrendIndicatorProps {
  direction: "up" | "down" | "neutral";
}

const TrendIndicator: React.FC<TrendIndicatorProps> = React.memo(
  ({ direction }) => {
    const getIcon = () => {
      switch (direction) {
        case "up":
          return <TrendingUpIcon fontSize='large' color='success' />;
        case "down":
          return <TrendingDownIcon fontSize='large' color='error' />;
        default:
          return <TrendingFlatIcon fontSize='large' color='action' />;
      }
    };

    const getLabelText = () => {
      switch (direction) {
        case "up":
          return "Positive trend";
        case "down":
          return "Negative trend";
        default:
          return "Neutral trend";
      }
    };

    return (
      <Box display='flex' alignItems='center' gap={1}>
        {getIcon()}
        <Typography variant='body2' color='text.secondary'>
          {getLabelText()}
        </Typography>
      </Box>
    );
  }
);

TrendIndicator.displayName = "TrendIndicator";

export default TrendIndicator;
