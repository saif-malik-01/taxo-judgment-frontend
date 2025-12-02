import { useEffect, useState } from "react";
import KPICards from "./kpi-cards";
import { Card } from "@/components/ui/card";
import {
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
} from "recharts";
import DataTable from "./data-table";

import type {
  Judgment,
  MonthlyAnalytics,
  RecentJudgmentResponse,
} from "@/types/judgment";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "";

const COLORS = ["#dc2626", "#16a34a", "#f59e0b", "#8b5cf6"];
const ISSUE_COLORS = ["#1d4ed8", "#0891b2", "#059669", "#7c3aed"];

export default function Dashboard() {
  const [monthlyData, setMonthlyData] = useState<MonthlyAnalytics[]>([]);
  const [recent, setRecent] = useState<Judgment[]>([]);
  const [stateData, setStateData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const formatMonth = (monthString: string): string => {
    const date = new Date(monthString + "-01");
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const mRes = await fetch(`${BASE_API_URL}/analytics/monthly`);
        const mJson: { data: MonthlyAnalytics[] } = await mRes.json();

        const formattedMonthly = mJson.data.map((item) => ({
          name: formatMonth(item.month),
          count: item.count,
          month: item.month,
        }));

        setMonthlyData(formattedMonthly);

        const rRes = await fetch(`${BASE_API_URL}/analytics/recent`);
        const rJson: RecentJudgmentResponse = await rRes.json();
        setRecent(rJson?.data || []);

        const sRes = await fetch(`${BASE_API_URL}/analytics/pie-by-state`);
        const sJson = await sRes.json();

        if (sJson.success && sJson.data) {
          const formattedState = sJson.data.map(
            (item: { state: string; count: number }) => ({
              name: item.state,
              value: item.count,
            })
          );
          setStateData(formattedState);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze GST judgments and legal trends with ease.
        </p>
      </div>
      <KPICards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Judgment Outcomes by State
          </h3>
          {stateData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stateData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">No data available.</p>
          )}
        </Card>

        <Card className="border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Judgments by Months
          </h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {monthlyData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={ISSUE_COLORS[index % ISSUE_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">No data available.</p>
          )}
        </Card>
      </div>
      <div className="space-y-4">
        <DataTable data={recent} loading={loading} />
      </div>
    </div>
  );
}
