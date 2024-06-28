export interface TemplateRequest {
  user_id: string;
}

export interface Templates {
  id: number;
  user_id: string;
  template_name: string;
  category_name: string;
  statement: string;
  amount: string;
}

export interface TemplateScheduleRequest {
  template_id: number;
  template_name: string;
}
