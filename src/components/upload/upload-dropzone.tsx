import { useState } from "react";
import { UploadIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  onFiles: (files: File[]) => void;
}

export default function UploadDropzone({ onFiles }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFiles(files);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFiles(Array.from(e.target.files));
    }
  };

  return (
    <Card
      className={`border-2 border-dashed p-12 rounded-lg cursor-pointer transition-colors ${
        isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <div className="flex flex-col items-center space-y-4">
        <UploadIcon className="w-12 h-12 text-accent" />
        <p className="text-muted-foreground text-sm">
          Drag & drop PDFs or click to browse
        </p>
        <Button variant="outline">Browse Files</Button>

        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf"
          className="hidden"
          onChange={handleInput}
        />
      </div>
    </Card>
  );
}
