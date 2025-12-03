import { useState } from "react";

export function useSettingsManager() {
  const [scraperTime, setScraperTime] = useState("02:00");
  const [scraperEnabled, setScraperEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return {
    scraperTime,
    setScraperTime,
    scraperEnabled,
    setScraperEnabled,
    saveSuccess,
    handleSave,
  };
}
