interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export default function ScraperToggle({ enabled, onToggle }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-border rounded-lg bg-muted/30 gap-3 sm:gap-0">
      <div className="flex flex-col">
        <p className="font-medium text-foreground text-sm sm:text-base">
          Enable Auto Scraper
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Start collecting judgment data automatically
        </p>
      </div>

      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 sm:h-8 w-12 sm:w-14 items-center rounded-full transition-colors ${
          enabled ? "bg-accent" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-5 sm:h-6 w-5 sm:w-6 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6 sm:translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
