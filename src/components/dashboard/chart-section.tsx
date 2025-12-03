import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import type { MonthlyAnalytics } from "@/types/judgment";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "";

const PIE_COLORS = ["#dc2626", "#16a34a", "#f59e0b", "#8b5cf6"];
const BAR_COLORS = ["#1d4ed8", "#0891b2", "#059669", "#7c3aed"];

export default function ChartSection() {
  const [monthlyData, setMonthlyData] = useState<{ name: string; count: number }[]>([]);
  const [stateData, setStateData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatMonth = (monthString: string) => {
    const date = new Date(monthString + "-01");
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => {
    async function fetchChartData() {
      setLoading(true);
      try {
        // --- Monthly Bar Chart Data ---
        const mRes = await fetch(`${BASE_API_URL}/analytics/monthly`);
        const mJson: { data: MonthlyAnalytics[] } = await mRes.json();

        const formattedMonthly = mJson.data.map((item) => ({
          name: formatMonth(item.month),
          count: item.count,
          month: item.month,
        }));
        setMonthlyData(formattedMonthly);

        // --- Pie Chart By State ---
        const sRes = await fetch(`${BASE_API_URL}/analytics/pie-by-state`);
        const sJson = await sRes.json();

        if (sJson.success && sJson.data) {
          setStateData(
            sJson.data.map((item: { state: string; count: number }) => ({
              name: item.state,
              value: item.count,
            }))
          );
        }
      } catch (err) {
        console.error("ChartSection fetch error:", err);
      }
      setLoading(false);
    }

    fetchChartData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* --- PIE CHART --- */}
      <Card className="border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Judgment Outcomes by State
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : stateData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {stateData.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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

      {/* --- BAR CHART --- */}
      <Card className="border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Judgments by Months
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : monthlyData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {monthlyData.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground">No data available.</p>
        )}
      </Card>
    </div>
  );
}
