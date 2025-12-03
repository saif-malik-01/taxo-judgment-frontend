import CardsSection from "@/components/dashboard/cards-section";
import ChartSection from "@/components/dashboard/chart-section";
import RecentTableSection from "@/components/dashboard/recent-table-section";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze GST judgments and legal trends with ease.
        </p>
      </div>
      <CardsSection />
      <ChartSection />
      <RecentTableSection />
    </div>
  );
}
