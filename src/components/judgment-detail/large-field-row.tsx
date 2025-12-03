import { Copy, Check } from "lucide-react";

interface Props {
  label: string;
  value: string | undefined;
  onCopy: (value: string, fieldName: string) => void;
  copied: boolean;
}

export default function LargeFieldRow({ label, value, onCopy, copied }: Props) {
  if (!value) return null;
  return (
    <div className="border-b border-border last:border-b-0 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground block mb-1">
            {label}
          </label>
          <p className="text-foreground wrap-break-word max-h-32 overflow-y-auto whitespace-pre-wrap">
            {value}
          </p>
        </div>
        <button
          onClick={() => onCopy(value, label)}
          className="mt-1 p-2 hover:bg-secondary rounded-md transition-colors shrink-0"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground hover:text-accent" />
          )}
        </button>
      </div>
    </div>
  );
}
