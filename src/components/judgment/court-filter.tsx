import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Court } from "@/types/common";

interface CourtFilterProps {
  courts: Court[];
  selectedCourt: string;
  setSelectedCourt: (court: string) => void;
  isCourtOpen: boolean;
  setIsCourtOpen: (open: boolean) => void;
}

export default function CourtFilter({
  courts,
  selectedCourt,
  setSelectedCourt,
  isCourtOpen,
  setIsCourtOpen,
}: CourtFilterProps) {
  return (
    <div className="w-full md:w-1/4 space-y-2">
      <label className="text-sm font-medium text-foreground">Court</label>

      <Popover open={isCourtOpen} onOpenChange={setIsCourtOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            {selectedCourt
              ? courts.find((c) => c.courtName === selectedCourt)?.displayName
              : "Select Court"}
            <ChevronDown className="w-4 h-4 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0" align="start">
          <div className="max-h-60 overflow-y-auto">
            {courts.map((court) => (
              <button
                key={court.courtName}
                onClick={() => {
                  setSelectedCourt(court.courtName);
                  setIsCourtOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors",
                  selectedCourt === court.courtName && "bg-muted/50 font-medium"
                )}
              >
                {court.displayName}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
