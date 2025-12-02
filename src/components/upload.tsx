import type React from "react"
import { useState } from "react"
import axios from "axios"
import { UploadIcon, File, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UploadedFile {
  id: string
  fileObj: File
  name: string
  status: "pending" | "processing" | "success" | "error"
  progress: number
  message?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const [judgeNames, setJudgeNames] = useState("")
  const [court, setCourt] = useState("")
  const [state, setState] = useState("")
  const [yearOfJudgment, setYearOfJudgment] = useState("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const newFiles = Array.from(e.dataTransfer.files)
    handleFiles(newFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const formatted = newFiles.map((file) => ({
      id: Math.random().toString(36),
      fileObj: file,
      name: file.name,
      status: "pending" as const,
      progress: 0,
    }))
    setFiles((prev) => [...prev, ...formatted])
  }

  const uploadSingleFile = async (fileEntry: UploadedFile) => {
    const formData = new FormData()
    formData.append("file", fileEntry.fileObj)
    formData.append("judge_name", judgeNames)
    formData.append("court_name", court)
    formData.append("state", state)
    formData.append("year_of_judgment", yearOfJudgment)

    try {
      const response = await axios.post(`${API_BASE_URL}/judgments/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded / event.total!) * 100)
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileEntry.id
                ? { ...f, progress, status: "processing" }
                : f
            )
          )
        },
      })

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id
            ? { ...f, status: "success", message: response.data?.message }
            : f
        )
      )
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Upload failed"
          : "Upload failed"

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileEntry.id
            ? { ...f, status: "error", message: errorMessage }
            : f
        )
      )
    }
  }

  const handleSubmit = async () => {
    for (const file of files) {
      if (file.status === "pending" || file.status === "error") {
        await uploadSingleFile(file)
      }
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Upload Judgments</h1>
        <p className="text-muted-foreground">Upload GST judgment PDFs for processing and analysis.</p>
      </div>

      <Card className="p-6 border border-border">
        <h2 className="text-lg font-semibold">Optional Metadata</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Judge Names"
            value={judgeNames}
            onChange={(e) => setJudgeNames(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Court Name"
            value={court}
            onChange={(e) => setCourt(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="State / UT"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="number"
            placeholder="Year of Judgment"
            value={yearOfJudgment}
            onChange={(e) => setYearOfJudgment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </Card>
      <Card
        className={`border-2 border-dashed p-12 rounded-lg cursor-pointer transition-colors ${
          isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <UploadIcon className="w-12 h-12 text-accent" />
          <p className="text-muted-foreground text-sm">Drag & drop PDFs or click to browse</p>
          <Button variant="outline">Browse Files</Button>
          <input type="file" multiple accept=".pdf" id="file-input" className="hidden" onChange={handleFileInput} />
        </div>
      </Card>
      {files.length > 0 && (
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
                      <p className="text-xs text-muted-foreground mt-1">{file.message}</p>
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
            <Button onClick={handleSubmit} disabled={files.length === 0}>
              Submit All
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
