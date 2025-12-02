export interface Judgment {
  id: number;
  title: string;
  case_number: string;
  judge_name: string;
  court_name: string;
  decision: string;
  created_at: string;
}

export interface JudgmentDetail {
  id: number;
  sort_order: number;
  general_citation?: string;
  case_number: string;
  title: string;
  petitioner_title: string;
  respondent_title: string;
  year_of_judgment: string;
  law: string;
  act_name: string;
  section_number: string;
  rule_name: string;
  rule_number: string;
  notification_number: string;
  judge_name: string;
  court: string;
  court_name: string;
  state: string;
  decision: string;
  case_note: string;
  summary: string;
  current_status: string;
  extracted_text: string;
  cleaned_judgment: string;
  file_url: string;
  metadata: string;
  text_search: string;
  created_at: Date;
  updated_at: Date;
}

export interface SearchJudgmentResponse {
  success: boolean;
  data: {
    items: Judgment[];
    total: number;
  };
}

export interface RecentJudgmentResponse {
  success: boolean;
  data: Judgment[];
}

export interface MonthlyAnalytics {
  month: string;
  count: number;
}
