import UploadMetadataForm from "@/components/upload/upload-metadata-form";
import UploadDropzone from "@/components/upload/upload-dropzone";
import UploadFileList from "@/components/upload/upload-file-list";
import { useUploadManager } from "@/hooks/use-upload-manager";

export default function Upload() {
  const { files, metadata, setMetadata, handleFiles, submitAll } =
    useUploadManager();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Upload Judgments</h1>
        <p className="text-muted-foreground">
          Upload GST judgment PDFs for processing and analysis.
        </p>
      </div>

      <UploadMetadataForm metadata={metadata} setMetadata={setMetadata} />
      <UploadDropzone onFiles={handleFiles} />
      <UploadFileList files={files} onSubmit={submitAll} />
    </div>
  );
}
