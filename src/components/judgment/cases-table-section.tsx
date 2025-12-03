import { useEffect, useState } from "react";
import { useEffectEvent } from "react";
import DataTable from "@/components/data-table";
import type {
  Judgment,
  SearchJudgmentResponse,
  RecentJudgmentResponse,
} from "@/types/judgment";
import type { DateRange } from "@/types/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

interface CasesTableSectionProps {
  debouncedQuery: string;
  selectedCourt: string;
  dateRange: DateRange;
}

export default function CasesTableSection({
  debouncedQuery,
  selectedCourt,
  dateRange,
}: CasesTableSectionProps) {
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 25;

  const fetchRecent = useEffectEvent(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/recent`);
      const json: RecentJudgmentResponse = await res.json();
      setJudgments(json.data);
      setTotal(json.data.length);
    } catch (err) {
      console.error("Recent fetch error:", err);
    }
    setLoading(false);
  });

  const fetchSearchResults = useEffectEvent(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedQuery) params.append("q", debouncedQuery);
      if (selectedCourt) params.append("courtName", selectedCourt);
      if (dateRange.from)
        params.append("startDate", dateRange.from.toISOString());
      if (dateRange.to) params.append("endDate", dateRange.to.toISOString());
      params.append("page", String(page));
      params.append("pageSize", String(pageSize));
      params.append("sortBy", "created_at");
      params.append("sortDir", "desc");
      const res = await fetch(`${API_BASE_URL}/judgments/search?${params}`);
      const json: SearchJudgmentResponse = await res.json();
      setJudgments(json.data.items);
      setTotal(json.data.total);
    } catch (err) {
      console.error("Search fetch error:", err);
    }
    setLoading(false);
  });

  const onFilterChange = useEffectEvent((page: number) => {
    setPage(page);
  });

  useEffect(() => {
    onFilterChange(1);
  }, [debouncedQuery, selectedCourt, dateRange]);

  useEffect(() => {
    const isDefault =
      !debouncedQuery && !selectedCourt && !dateRange.from && !dateRange.to;

    if (isDefault) fetchRecent();
    else fetchSearchResults();
  }, [debouncedQuery, selectedCourt, dateRange, page]);

  return (
    <DataTable
      data={judgments}
      loading={loading}
      page={page}
      setPage={setPage}
      total={total}
      pageSize={pageSize}
    />
  );
}
