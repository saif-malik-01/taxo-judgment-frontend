import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">Taxo Judgments</h1>
        </div>

        <Button variant="ghost" size="icon" className="relative"></Button>
      </div>
    </header>
  );
}
