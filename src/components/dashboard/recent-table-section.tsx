import { useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import type { Judgment, RecentJudgmentResponse } from "@/types/judgment";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function RecentTableSection() {
  const [recent, setRecent] = useState<Judgment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRecent() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_API_URL}/analytics/recent`);
        const json: RecentJudgmentResponse = await res.json();
        setRecent(json?.data || []);
      } catch (err) {
        console.error("RecentTableSection fetch error:", err);
      }
      setLoading(false);
    }

    fetchRecent();
  }, []);

  return (
    <div className="space-y-4">
      <DataTable data={recent} loading={loading} />
    </div>
  );
}
