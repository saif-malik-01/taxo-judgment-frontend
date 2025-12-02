import { useState, useEffect, useCallback } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DataTable from "./data-table";

import type {
  Judgment,
  SearchJudgmentResponse,
  RecentJudgmentResponse,
} from "@/types/judgment";

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface Court {
  courtName: string;
  displayName: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Cases() {
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [courts, setCourts] = useState<Court[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isCourtOpen, setIsCourtOpen] = useState<boolean>(false);

  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 25;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const formatDisplayName = (raw: string) => {
    return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const fetchCourts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/judgments/court-names`);
      const data = await res.json();

      if (data?.data) {
        const formatted: Court[] = data.data.map(
          (c: { court_name: string }) => ({
            courtName: c.court_name,
            displayName: formatDisplayName(c.court_name),
          })
        );
        setCourts(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch court names:", err);
    }
  }, []);

  const formatRange = (): string => {
    if (dateRange.from && dateRange.to)
      return `${format(dateRange.from, "dd MMM yyyy")} → ${format(
        dateRange.to,
        "dd MMM yyyy"
      )}`;
    if (dateRange.from) return format(dateRange.from, "dd MMM yyyy");
    return "Pick date range";
  };

  const fetchRecent = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/recent`);
      const data: RecentJudgmentResponse = await res.json();
      setJudgments(data.data);
      setTotal(data.data.length);
    } catch (err) {
      console.error("Failed recent fetch:", err);
    }
    setLoading(false);
  }, []);

  const fetchSearchResults = useCallback(async (): Promise<void> => {
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

      const res = await fetch(
        `${API_BASE_URL}/judgments/search?${params.toString()}`
      );
      const data: SearchJudgmentResponse = await res.json();

      setJudgments(data.data.items);
      setTotal(data.data.total); // Store total
    } catch (err) {
      console.error("Search fetch error:", err);
    }
    setLoading(false);
  }, [debouncedQuery, selectedCourt, dateRange, page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourts();
  }, [fetchCourts]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedQuery, selectedCourt, dateRange]);

  useEffect(() => {
    const isDefault =
      !debouncedQuery && !selectedCourt && !dateRange.from && !dateRange.to;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isDefault) fetchRecent();
    else fetchSearchResults();
  }, [
    debouncedQuery,
    selectedCourt,
    dateRange,
    page,
    fetchSearchResults,
    fetchRecent,
  ]);

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Cases</h1>
        <p className="text-muted-foreground">
          Browse and filter all GST judgment cases.
        </p>
      </div>

      <Card className="border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by case number, title, or keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Court Dropdown */}
          <div className="w-full md:w-1/4 space-y-2">
            <label className="text-sm font-medium text-foreground">Court</label>
            <Popover open={isCourtOpen} onOpenChange={setIsCourtOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent"
                >
                  {selectedCourt
                    ? courts.find((c) => c.courtName === selectedCourt)
                        ?.displayName
                    : "Select Court"}
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0" align="start">
                <div className="max-h-60 overflow-y-auto">
                  {courts.length === 0 && (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      Loading...
                    </div>
                  )}
                  {courts.map((court) => (
                    <button
                      key={court.courtName}
                      onClick={() => {
                        setSelectedCourt(court.courtName);
                        setIsCourtOpen(false);
                      }}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors",
                        selectedCourt === court.courtName &&
                          "bg-muted/50 font-medium"
                      )}
                    >
                      {court.displayName}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Decision Year Filter */}
          <div className="w-full md:w-1/4 space-y-2">
            <label className="text-sm font-medium text-foreground">
              Decision Year
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between bg-transparent text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  {formatRange()}
                  <Calendar className="w-4 h-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={(selected) =>
                    setDateRange(
                      (selected as DateRange) ?? {
                        from: undefined,
                        to: undefined,
                      }
                    )
                  }
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>

      <DataTable
        data={judgments}
        loading={loading}
        page={page}
        setPage={setPage}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
}
