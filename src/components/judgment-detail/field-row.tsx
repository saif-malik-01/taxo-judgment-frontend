import { useState } from "react";
import { Pencil, Save, X, Copy, Check } from "lucide-react";

interface Props {
  label: string;
  value: string | undefined;
  onCopy: (value: string, fieldName: string) => void;
  copied: boolean;
  onUpdate?: (fieldName: string, newValue: string) => void;
}

export default function FieldRow({ label, value, onCopy, copied, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const saveEdit = () => {
    if (onUpdate) onUpdate(label, tempValue);
    setIsEditing(false);
  };

  return (
    <div className="border-b border-border last:border-b-0 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground block mb-1">
            {label}
          </label>
          {isEditing ? (
            <input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full border border-border rounded px-2 py-1"
            />
          ) : (
            <p className="text-foreground wrap-break-word">{value || "N/A"}</p>
          )}
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => value && onCopy(value, label)}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              {onUpdate && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={saveEdit}
                className="p-2 hover:bg-green-200 rounded-md transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setTempValue(value || "");
                  setIsEditing(false);
                }}
                className="p-2 hover:bg-red-200 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
