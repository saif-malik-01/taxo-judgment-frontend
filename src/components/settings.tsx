"use client"

import { useState } from "react"
import { Clock, PlayCircle, Save } from "lucide-react"

export default function Settings() {
  const [scraperTime, setScraperTime] = useState("02:00")
  const [scraperEnabled, setScraperEnabled] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <div className="p-8 bg-background min-h-full">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your GST Judgments system preferences</p>
        </div>

        <div className="space-y-6">
          {/* Scraper Settings Card */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                  <PlayCircle className="w-5 h-5 text-accent" />
                  Scraper Configuration
                </h2>
                <p className="text-sm text-muted-foreground">Manage automatic judgment data collection</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">Enable Auto Scraper</p>
                  <p className="text-sm text-muted-foreground">Start collecting judgment data automatically</p>
                </div>
                <button
                  onClick={() => setScraperEnabled(!scraperEnabled)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    scraperEnabled ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      scraperEnabled ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Time Picker */}
              <div className="p-4 border border-border rounded-lg bg-muted/30">
                <label className="block mb-3">
                  <p className="font-medium text-foreground flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Scraper Start Time
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">Set the time when scraper should run daily</p>
                </label>
                <input
                  type="time"
                  value={scraperTime}
                  onChange={(e) => setScraperTime(e.target.value)}
                  disabled={!scraperEnabled}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Status Info */}
              {scraperEnabled && (
                <div className="p-4 border border-border rounded-lg bg-accent/10">
                  <p className="text-sm text-accent font-medium">✓ Scraper will run daily at {scraperTime}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Data collection will automatically start at the scheduled time
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* System Info Card */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">System Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium text-foreground">Nov 12, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-accent">Active</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
            {saveSuccess && (
              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                ✓ Settings saved successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
