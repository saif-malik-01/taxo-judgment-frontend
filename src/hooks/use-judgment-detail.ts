import { useState, useEffect } from "react";
import type { JudgmentDetail as JudgmentDetailType } from "@/types/judgment";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function useJudgmentDetail(id: string | undefined) {
  const [judgment, setJudgment] = useState<JudgmentDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJudgment = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/judgments/${id}`);
        if (!res.ok) throw new Error("Failed to fetch judgment");
        const json = await res.json();
        if (!json.success) throw new Error("Failed to fetch judgment");
        setJudgment(json.data);
      } catch (err: unknown) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJudgment();
  }, [id]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadPDF = () => {
    if (!judgment) return;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      API_BASE_URL.replace("/api", "") + judgment.file_url || "#"
    );
    element.setAttribute("download", `${judgment.case_number}-judgment.pdf`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const updateField = async (fieldName: string, newValue: string) => {
    if (!judgment) return;

    const key = Object.keys(judgment).find(
      (k) => k.replace(/_/g, " ").toLowerCase() === fieldName.toLowerCase()
    );

    if (!key) return;

    const updated = { ...judgment, [key]: newValue };
    setJudgment(updated);

    try {
      await fetch(`${API_BASE_URL}/judgments/${judgment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: newValue }),
      });
    } catch (err) {
      console.error("Failed to update", (err as Error).message);
    }
  };

  return {
    judgment,
    loading,
    error,
    copiedField,
    copyToClipboard,
    downloadPDF,
    updateField,
  };
}
