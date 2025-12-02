export interface TrendData {
  count: number
  prev_count: number
  trend: number
  trend_percent: number | null
}

export interface AnalyticsOverview {
  total_judgments: number
  total_supreme: number
  total_high: number
  last1d: TrendData
  supreme_last1d: TrendData
  high_last1d: TrendData
  todays_count: number
}

export interface KPIItem {
  label: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  highlight?: boolean
  change?: string | null
  direction?: "up" | "down"
}
