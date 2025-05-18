/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Trend {
  date: string;
  sentiment: number;
}

interface TrendData {
  hashtag: string;
  range: string;
  trend: Trend[];
}

interface TrendDataResponse {
  trendData: {
    [hashtag: string]: TrendData;
  };
}

export const useHashtagTrend = (hashtag: string) => {
  return useQuery<TrendData, Error>({
    queryKey: ["trend", hashtag],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/trends/${hashtag}`);
        return response.data;
      } catch (error: any) {
        throw new Error(
          error?.response?.data?.error || "Failed to fetch hashtag trend"
        );
      }
    },
    enabled: !!hashtag,
    retry: false
  });
};

export const useAllHashtagTrends = () => {
  return useQuery<TrendDataResponse, Error>({
    queryKey: ["allTrends"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/trends`);
        return response.data;
      } catch (error: any) {
        throw new Error(
          error?.response?.data?.error || "Failed to fetch all hashtag trends"
        );
      }
    },
    retry: false
  });
};
