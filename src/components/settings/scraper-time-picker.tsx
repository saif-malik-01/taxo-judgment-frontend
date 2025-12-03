import { Clock } from "lucide-react";

interface Props {
  time: string;
  setTime: (v: string) => void;
  disabled: boolean;
}

export default function ScraperTimePicker({ time, setTime, disabled }: Props) {
  return (
    <div className="p-4 border border-border rounded-lg bg-muted/30">
      <label className="block mb-3">
        <p className="font-medium text-foreground flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4" />
          Scraper Start Time
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Set the time when scraper should run daily
        </p>
      </label>

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground
        focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
