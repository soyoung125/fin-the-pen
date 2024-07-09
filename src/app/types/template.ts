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
  template_id: string;
  template_name: string;
}

export interface TemplateImportRequest extends TemplateRequest {
  category_name: string;
  event_name: string;
}

export interface TemplateImportResponse {
  template_id: string;
  user_id: string;
  template_name: string;
  category_name: string;
}

export interface TemplateByPriceType {
  deposit: Templates[];
  withdraw: Templates[];
}
