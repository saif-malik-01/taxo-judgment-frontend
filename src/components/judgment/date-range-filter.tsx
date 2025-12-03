import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/types/common";

interface DateRangeFilterProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export default function DateRangeFilter({
  dateRange,
  setDateRange,
}: DateRangeFilterProps) {
  const formatRange = () => {
    if (dateRange.from && dateRange.to)
      return `${format(dateRange.from, "dd MMM yyyy")} → ${format(
        dateRange.to,
        "dd MMM yyyy"
      )}`;
    if (dateRange.from) return format(dateRange.from, "dd MMM yyyy");
    return "Pick date range";
  };

  return (
    <div className="w-full md:w-1/4 space-y-2">
      <label className="text-sm font-medium text-foreground">Decision Year</label>

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
                (selected as DateRange) ?? { from: undefined, to: undefined }
              )
            }
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
