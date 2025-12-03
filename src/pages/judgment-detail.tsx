import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FieldRow from "@/components/judgment-detail/field-row";
import LargeFieldRow from "@/components/judgment-detail/large-field-row";
import { useJudgmentDetail } from "@/hooks/use-judgment-detail";

export default function JudgmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    judgment,
    loading,
    error,
    copiedField,
    copyToClipboard,
    downloadPDF,
    updateField,
  } = useJudgmentDetail(id);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!judgment) return <p className="p-8 text-center">Judgment not found.</p>;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={() => navigate(-1)} variant="ghost">
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
        <Button className="w-fit" onClick={downloadPDF}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Case Information
        </h2>
        <FieldRow
          label="Title"
          value={judgment.title}
          copied={copiedField === "Title"}
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
