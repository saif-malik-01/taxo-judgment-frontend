import { Save } from "lucide-react";

interface Props {
  onSave: () => void;
  success: boolean;
}

export default function SaveSettingsButton({ onSave, success }: Props) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        onClick={onSave}
        className="flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
      >
        <Save className="w-4 h-4" />
        Save Settings
      </button>

      {success && (
        <div className="flex items-center gap-2 text-accent text-sm font-medium">
          ✓ Settings saved successfully
        </div>
      )}
    </div>
  );
}
