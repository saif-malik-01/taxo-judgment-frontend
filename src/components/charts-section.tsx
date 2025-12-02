"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const judgmentsOverTime = [
  { year: "2019", count: 225 },
  { year: "2020", count: 280 },
  { year: "2021", count: 320 },
  { year: "2022", count: 385 },
  { year: "2023", count: 425 },
  { year: "2024", count: 248 },
]

const topIssues = [
  { name: "Refunds", count: 856 },
  { name: "ITC", count: 724 },
  { name: "Classification", count: 612 },
  { name: "Penalty", count: 445 },
]

const caseOutcomes = [
  { name: "Allowed", value: 1195 },
  { name: "Dismissed", value: 1102 },
  { name: "Partly Allowed", value: 550 },
]

export default function ChartsSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Judgments Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={judgmentsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Top Issues</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topIssues}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Case Outcomes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={caseOutcomes}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              <Cell fill="hsl(var(--accent))" />
              <Cell fill="hsl(var(--destructive))" />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
