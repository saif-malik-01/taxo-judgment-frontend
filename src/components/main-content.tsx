"use client"

import KPICards from "./kpi-cards"
import ChartsSection from "./charts-section"
import DataTable from "./data-table"

export default function MainContent() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Analyze GST judgments and legal trends with ease.</p>
      </div>

      <KPICards />
      <ChartsSection />
      <DataTable />
    </div>
  )
}
