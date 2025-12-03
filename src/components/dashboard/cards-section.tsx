import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { mapAnalyticsToKPIs } from "@/lib/mapKpis";
import type { AnalyticsOverview, KPIItem } from "@/types/analytics";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function CardsSection() {
  const [kpis, setKpis] = useState<KPIItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE_API_URL}/analytics/overview`);
        const json = await res.json();
        setKpis(
          mapAnalyticsToKPIs(
            json.success ? (json.data as AnalyticsOverview) : null
          )
        );
      } catch (err) {
        setKpis(mapAnalyticsToKPIs(null));
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading KPIs...</p>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;

        return (
          <Card
            key={idx}
            className={`overflow-hidden border-0 p-6 shadow-sm transition-all hover:shadow-md ${
              kpi.highlight
                ? "bg-accent text-accent-foreground"
                : "bg-card text-card-foreground"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{kpi.label}</p>
                  <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                </div>
                <Icon className="w-5 h-5 opacity-60" />
              </div>

              {kpi.change ? (
                <div className="flex items-center gap-1 text-xs opacity-75">
                  {kpi.direction === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{kpi.change}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs opacity-75">
                  <span>
                    {kpi.label !== "Today's Judgments" && "No data available"}
                  </span>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
