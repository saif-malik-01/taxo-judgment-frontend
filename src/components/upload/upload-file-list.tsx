import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, CheckCircle } from "lucide-react";
import type { UploadedFile } from "@/hooks/use-upload-manager";

interface Props {
  files: UploadedFile[];
  onSubmit: () => void;
}

export default function UploadFileList({ files, onSubmit }: Props) {
  if (files.length === 0) return null;

  return (
    <Card className="border p-6 mt-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Selected Files</h3>

      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <File className="w-5 h-5 text-muted-foreground" />

              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>

                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>

                {file.message && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {file.status === "success" && (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-green-500">Uploaded</span>
                </>
              )}

              {file.status === "error" && (
                <span className="text-xs text-red-500">Failed</span>
              )}

              {file.status === "processing" && (
                <>
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">{file.progress}%</span>
                </>
              )}

              {file.status === "pending" && (
                <span className="text-xs text-muted-foreground">Pending</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={files.length === 0}>
          Submit All
        </Button>
      </div>
    </Card>
  );
}
