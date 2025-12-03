import ScraperToggle from "@/components/settings/scraper-toggle";
import ScraperTimePicker from "@/components/settings/scraper-time-picker";
import ScraperStatus from "@/components/settings/scraper-status";
import SystemInfo from "@/components/settings/system-info";
import SaveSettingsButton from "@/components/settings/save-settings-button";
import { useSettingsManager } from "@/hooks/use-settings-manager";

export default function Settings() {
  const {
    scraperTime,
    setScraperTime,
    scraperEnabled,
    setScraperEnabled,
    saveSuccess,
    handleSave,
  } = useSettingsManager();

  return (
    <div className="bg-background min-h-full">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your GST Judgments system preferences
          </p>
        </div>

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
              Scraper Configuration
            </h2>
            <ScraperToggle
              enabled={scraperEnabled}
              onToggle={() => setScraperEnabled(!scraperEnabled)}
            />
            <ScraperTimePicker
              time={scraperTime}
              setTime={setScraperTime}
              disabled={!scraperEnabled}
            />
            <ScraperStatus enabled={scraperEnabled} time={scraperTime} />
          </div>
          <SystemInfo />
          <SaveSettingsButton onSave={handleSave} success={saveSuccess} />
        </div>
      </div>
    </div>
  );
}
