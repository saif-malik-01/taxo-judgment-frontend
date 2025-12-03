import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBox({
  searchQuery,
  setSearchQuery,
}: SearchBoxProps) {
  return (
    <div className="w-full flex-1 space-y-2">
      <label className="text-sm font-medium text-foreground">Search</label>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by case number, title, or keywords..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
