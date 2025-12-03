export default function SystemInfo() {
  return (
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
  );
}
