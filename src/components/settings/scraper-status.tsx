interface Props {
  enabled: boolean;
  time: string;
}

export default function ScraperStatus({ enabled, time }: Props) {
  if (!enabled) return null;

  return (
    <div className="p-4 border border-border rounded-lg bg-accent/10">
      <p className="text-sm text-accent font-medium">
        ✓ Scraper will run daily at {time}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        Data collection will automatically start at the scheduled time
      </p>
    </div>
  );
}
