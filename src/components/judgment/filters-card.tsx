import { Card } from "@/components/ui/card";
import SearchBox from "./search-box";
import CourtFilter from "./court-filter";
import DateRangeFilter from "./date-range-filter";
import type { Court, DateRange } from "@/types/common";

interface FiltersCardProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  courts: Court[];
  selectedCourt: string;
  setSelectedCourt: (value: string) => void;
  isCourtOpen: boolean;
  setIsCourtOpen: (value: boolean) => void;

  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export default function FiltersCard({
  searchQuery,
  setSearchQuery,
  courts,
  selectedCourt,
  setSelectedCourt,
  isCourtOpen,
  setIsCourtOpen,
  dateRange,
  setDateRange,
}: FiltersCardProps) {
  return (
    <Card className="border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CourtFilter
          courts={courts}
          selectedCourt={selectedCourt}
          setSelectedCourt={setSelectedCourt}
          isCourtOpen={isCourtOpen}
          setIsCourtOpen={setIsCourtOpen}
        />

        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      </div>
    </Card>
  );
}
