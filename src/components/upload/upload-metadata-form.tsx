import { Card } from "@/components/ui/card";
import type { UploadMetadata } from "@/hooks/use-upload-manager";

interface Props {
  metadata: UploadMetadata;
  setMetadata: (data: UploadMetadata) => void;
}

export default function UploadMetadataForm({ metadata, setMetadata }: Props) {
  return (
    <Card className="p-6 border border-border">
      <h2 className="text-lg font-semibold">Optional Metadata</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          placeholder="Judge Names"
          value={metadata.judgeNames}
          onChange={(e) =>
            setMetadata({ ...metadata, judgeNames: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Court Name"
          value={metadata.court}
          onChange={(e) =>
            setMetadata({ ...metadata, court: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="State / UT"
          value={metadata.state}
          onChange={(e) =>
            setMetadata({ ...metadata, state: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Year of Judgment"
          value={metadata.yearOfJudgment}
          onChange={(e) =>
            setMetadata({ ...metadata, yearOfJudgment: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </Card>
  );
}
