"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

export default function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is the GST Judgments Dashboard?",
      answer:
        "The GST Judgments Dashboard is a comprehensive platform for managing and analyzing GST (Goods and Services Tax) related court judgments and legal decisions from across India. It helps users search, filter, and understand GST tax rulings and their implications.",
    },
    {
      question: "How do I search for specific judgments?",
      answer:
        "Navigate to the 'Cases' tab and use the search bar at the top. You can filter by court, state, and specific date ranges. Type keywords from the judgment to find relevant cases quickly.",
    },
    {
      question: "How can I upload new judgment documents?",
      answer:
        "Go to the 'Upload' tab and drag-and-drop a PDF file or click to browse your files. The system will process the PDF and extract judgment details automatically. You'll see a progress indicator during processing.",
    },
    {
      question: "What file formats are supported for upload?",
      answer:
        "Currently, the system supports PDF files. Ensure your PDF is clear and readable for best results. Large files may take longer to process. The maximum file size is typically 50MB.",
    },
    {
      question: "How do I set up automatic data collection?",
      answer:
        "Go to the 'Settings' tab and enable 'Auto Scraper'. Set your preferred start time using the time picker. The system will automatically collect and update judgment data daily at the specified time.",
    },
    {
      question: "What do the KPI cards on the Dashboard show?",
      answer:
        "The KPI cards display key metrics: Total Judgments (all cases in the system), Disposed Cases (completed judgments), Pending Cases (ongoing cases), and Allowed Cases (judgments ruled in favor). These give you a quick overview of the system's data.",
    },
    {
      question: "How are the charts organized on the Dashboard?",
      answer:
        "The Dashboard displays: (1) Outcome Distribution by State (pie chart), (2) Top Issues (bar chart showing most common judgment topics), and (3) Recent Judgments (table with latest cases). This helps you understand trends and patterns.",
    },
    {
      question: "Can I filter judgments by multiple criteria?",
      answer:
        "Yes! In the 'Cases' tab, you can filter by court, state, and use the search function for specific keywords. You can also select a date range using the calendar picker to narrow down your results.",
    },
    {
      question: "How long does it take to process an uploaded judgment?",
      answer:
        "Processing time depends on file size and complexity. Most documents are processed within 2-5 minutes. You'll receive a notification once processing is complete, and the judgment will appear in your cases list.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Yes, all data is securely stored and processed. The system complies with data protection standards. Your uploads and searches are private and not shared with third parties.",
    },
    {
      question: "How do I interpret judgment outcomes?",
      answer:
        "Judgments are categorized as: Allowed (favorable decision), Dismissed (case rejected), Partially Allowed (partial favorable decision), and Pending (still under consideration). Check the color-coded badges in the cases list for quick reference.",
    },
    {
      question: "Can I export judgment data?",
      answer:
        "Currently, you can view and analyze judgments within the dashboard. Export functionality is being developed. You can take screenshots or use browser print functions for documentation.",
    },
    {
      question: "What should I do if I encounter an error?",
      answer:
        "If you encounter issues, try refreshing the page. For persistent problems, check your internet connection and ensure your browser is up to date. Contact support if the issue continues.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "Data is updated automatically when new judgments are scraped (based on your scraper settings). Manual uploads are added immediately to the system for your review and analysis.",
    },
  ]

  return (
    <div className="bg-background min-h-full">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <HelpCircle className="w-8 h-8 text-accent" />
            Help & FAQ
          </h1>
          <p className="text-muted-foreground">Find answers to common questions about GST Judgments Dashboard</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-accent shrink-0 transition-transform ${
                    expandedFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedFaq === index && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 border border-border rounded-lg bg-accent/10">
          <h2 className="text-lg font-semibold text-accent mb-2">Need More Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you can't find the answer you're looking for, reach out to our support team for additional assistance.
          </p>
          <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
