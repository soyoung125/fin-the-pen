import { Schedule } from "@app/types/schedule.ts";

export interface TemplateRequest {
  user_id: string;
}

export interface Template {
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

export interface TemplateImport {
  template_id: string;
  user_id: string;
  template_name: string;
  category_name: string;
}

export interface TemplateImportResponse {
  schedule_data?: Schedule;
  template_data: TemplateImport;
}

export interface TemplateByPriceType {
  deposit: Template[];
  withdraw: Template[];
}

export interface TemplateSchedulesRequest extends TemplateRequest {
  template_id: string;
}

export interface TemplateSchedulesResponse {
  template: Omit<Template, "amount">;
  schedule: Schedule[];
}

export interface ModifyTemplateSchedule {
  amount?: string;
  is_fixed?: string;
  payment_type: string;
  is_excluded: string;
}

export interface ModifyTemplateSchedulesRequest
  extends TemplateSchedulesRequest,
    ModifyTemplateSchedule {
  schedule_id_list: string;
}

export interface ModifyTemplateRequest extends TemplateImportRequest {
  template_id: string;
}
