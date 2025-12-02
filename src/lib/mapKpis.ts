import type { AnalyticsOverview, KPIItem } from "@/types/analytics";
import { FileText, Scale, Gavel, TrendingUp } from "lucide-react";

const defaultAnalytics: AnalyticsOverview = {
  total_judgments: 0,
  total_supreme: 0,
  total_high: 0,
  todays_count: 0,
  last1d: { trend_percent: null, count: 0, prev_count: 0, trend: 0 },
  supreme_last1d: { trend_percent: null, count: 0, prev_count: 0, trend: 0 },
  high_last1d: { trend_percent: null, count: 0, prev_count: 0, trend: 0 },
};

export function mapAnalyticsToKPIs(
  data: AnalyticsOverview | null | undefined
): KPIItem[] {
  const safe = { ...defaultAnalytics, ...data };

  const getDirection = (value?: number | null): "up" | "down" | undefined => {
    if (value == null) return undefined;
    return value > 0 ? "up" : "down";
  };

  return [
    {
      label: "Total Judgments",
      value: safe.total_judgments,
      icon: FileText,
      highlight: true,
      change: formatTrend(safe.last1d.trend_percent),
      direction: getDirection(safe.last1d.trend_percent),
    },
    {
      label: "Supreme Court",
      value: safe.total_supreme,
      icon: Scale,
      change: formatTrend(safe.supreme_last1d.trend_percent),
      direction: getDirection(safe.supreme_last1d.trend_percent),
    },
    {
      label: "High Court",
      value: safe.total_high,
      icon: Gavel,
      change: formatTrend(safe.high_last1d.trend_percent),
      direction: getDirection(safe.high_last1d.trend_percent),
    },
    {
      label: "Today's Judgments",
      value: safe.todays_count,
      icon: TrendingUp,
      change: null,
      direction: undefined,
    },
  ];
}

function formatTrend(percent: number | null): string | null {
  if (percent === null) return null;
  return `${percent}% from last month`;
}
