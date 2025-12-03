import { useState } from "react";
import axios from "axios";

export interface UploadedFile {
  id: string;
  fileObj: File;
  name: string;
  status: "pending" | "processing" | "success" | "error";
  progress: number;
  message?: string;
}

export interface UploadMetadata {
  judgeNames: string;
  court: string;
  state: string;
  yearOfJudgment: string;
}

interface UploadResponse {
  message?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function useUploadManager() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [metadata, setMetadata] = useState<UploadMetadata>({
    judgeNames: "",
    court: "",
    state: "",
    yearOfJudgment: "",
  });

  const handleFiles = (newFiles: File[]) => {
    const formatted: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36),
      fileObj: file,
      name: file.name,
      status: "pending",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...formatted]);
  };

  const uploadSingleFile = async (fileEntry: UploadedFile) => {
    const formData = new FormData();
    formData.append("file", fileEntry.fileObj);
    formData.append("judge_name", metadata.judgeNames);
    formData.append("court_name", metadata.court);
    formData.append("state", metadata.state);
    formData.append("year_of_judgment", metadata.yearOfJudgment);

    try {
      const response = await axios.post<UploadResponse>(
        `${API_BASE_URL}/judgments/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            if (!event.total) return;
            const progress = Math.round((event.loaded / event.total) * 100);

            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileEntry.id
                  ? { ...f, progress, status: "processing" }
                  : f
              )
            );
          },
        }
      );

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id
            ? { ...f, status: "success", message: response.data?.message }
            : f
        )
      );
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err)
          ? err.response?.data?.error || "Upload failed"
          : "Upload failed";

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id
            ? { ...f, status: "error", message: errorMessage }
            : f
        )
      );
    }
  };

  const submitAll = async () => {
    for (const file of files) {
      if (file.status === "pending" || file.status === "error") {
        await uploadSingleFile(file);
      }
    }
  };

  return {
    files,
    setFiles,
    metadata,
    setMetadata,
    handleFiles,
    submitAll,
  };
}
