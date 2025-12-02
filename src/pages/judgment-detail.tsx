import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";
import { Pencil, Save, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { JudgmentDetail as JudgmentDetailType } from "@/types/judgment";
import { Button } from "@/components/ui/button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function FieldRow({
  label,
  value,
  onCopy,
  copied,
  onUpdate,
}: {
  label: string;
  value: string | undefined;
  onCopy: (value: string, fieldName: string) => void;
  copied: boolean;
  onUpdate: (fieldName: string, newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const saveEdit = () => {
    onUpdate(label, tempValue);
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

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => value && onCopy(value, label)}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
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

function LargeFieldRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string | undefined;
  onCopy: (value: string, fieldName: string) => void;
  copied: boolean;
}) {
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

export default function JudgmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [judgment, setJudgment] = useState<JudgmentDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleBack = () => navigate(-1);

  useEffect(() => {
    if (!id) return;
    const fetchJudgment = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/judgments/${id}`);
        if (!res.ok) throw new Error("Failed to fetch judgment");
        const json = await res.json();
        if (!json.success) throw new Error("Failed to fetch judgment");
        const data: JudgmentDetailType = json.data;
        setJudgment(data);
      } catch (err: unknown) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchJudgment();
  }, [id]);

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

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!judgment) return <p className="p-8 text-center">Judgment not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={handleBack} variant="ghost">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">
          {judgment.title}
        </h1>
      </div>
      <Card className="p-6 mb-6 bg-linear-to-r from-accent/5 to-accent/10 border-accent/20">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Download Documents
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={downloadPDF}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Case Information
        </h2>
        <FieldRow
          label="Title"
          value={String(judgment.title)}
          copied={copiedField === "Title"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Citation"
          value={String(judgment.id)}
          copied={copiedField === "Citation"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Case Number"
          value={judgment.case_number}
          copied={copiedField === "Case Number"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Petitioner/Appellant Title"
          value={judgment.petitioner_title}
          copied={copiedField === "Petitioner/Appellant Title"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Respondent Title"
          value={judgment.respondent_title}
          copied={copiedField === "Respondent Title"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Year of Judgement"
          value={judgment.year_of_judgment}
          copied={copiedField === "Year of Judgement"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Legal Details
        </h2>
        <FieldRow
          label="Law"
          value={judgment.law}
          copied={copiedField === "Law"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Act Name"
          value={judgment.act_name}
          copied={copiedField === "Act Name"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Section Number"
          value={judgment.section_number}
          copied={copiedField === "Section Number"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Rule Name"
          value={judgment.rule_name}
          copied={copiedField === "Rule Name"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Rule Number"
          value={judgment.rule_number}
          copied={copiedField === "Rule Number"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Notification / Circular Number"
          value={judgment.notification_number}
          copied={copiedField === "Notification / Circular Number"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Court & Decision
        </h2>
        <FieldRow
          label="Judge Name"
          value={judgment.judge_name}
          copied={copiedField === "Judge Name"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Decision"
          value={judgment.decision}
          copied={copiedField === "Decision"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Court"
          value={judgment.court}
          copied={copiedField === "Court"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="Court Name"
          value={judgment.court_name}
          copied={copiedField === "Court Name"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
        <FieldRow
          label="State"
          value={judgment.state}
          copied={copiedField === "State"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Citations
        </h2>
        <FieldRow
          label="General Citation"
          value={judgment.general_citation}
          copied={copiedField === "General Citation"}
          onCopy={copyToClipboard}
          onUpdate={updateField}
        />
      </Card>
      
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Description & Notes
        </h2>
        <LargeFieldRow
          label="Cleaned Judgment"
          value={judgment.cleaned_judgment}
          copied={copiedField === "Cleaned Judgment"}
          onCopy={copyToClipboard}
        />
        <LargeFieldRow
          label="Summary"
          value={judgment.summary}
          copied={copiedField === "Summary"}
          onCopy={copyToClipboard}
        />
        <LargeFieldRow
          label="Original Content"
          value={judgment.current_status}
          copied={copiedField === "Original Content"}
          onCopy={copyToClipboard}
        />
      </Card>
    </div>
  );
}
