import { useEffect, useState, useEffectEvent } from "react";
import FiltersCard from "@/components/judgment/filters-card";
import CasesTableSection from "@/components/judgment/cases-table-section";
import type { Court, DateRange } from "@/types/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Cases() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [isCourtOpen, setIsCourtOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const formatDisplayName = useEffectEvent((raw: string): string => {
    return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  });

  const fetchCourts = useEffectEvent(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/judgments/court-names`);
      const data = await res.json();

      if (data?.data) {
        setCourts(
          data.data.map((c: { court_name: string }) => ({
            courtName: c.court_name,
            displayName: formatDisplayName(c.court_name),
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching courts:", err);
    }
  });

  useEffect(() => {
    fetchCourts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Judgments</h1>
        <p className="text-muted-foreground">
          Browse and filter all GST judgment cases.
        </p>
      </div>

      <FiltersCard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        courts={courts}
        selectedCourt={selectedCourt}
        setSelectedCourt={setSelectedCourt}
        isCourtOpen={isCourtOpen}
        setIsCourtOpen={setIsCourtOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <CasesTableSection
        debouncedQuery={debouncedQuery}
        selectedCourt={selectedCourt}
        dateRange={dateRange}
      />
    </div>
  );
}
