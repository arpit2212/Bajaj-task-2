//types.ts

export interface User {
    rollNumber: string;
    name: string;
  }
  
  export interface FormField {
    fieldId: string;
    type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
    label: string;
    placeholder?: string;
    required: boolean;
    dataTestId: string;
    validation?: {
      message: string;
    };
    options?: Array<{
      value: string;
      label: string;
      dataTestId?: string;
    }>;
    maxLength?: number;
    minLength?: number;
  }
  
  export interface FormSection {
    sectionId: number;
    title: string;
    description: string;
    fields: FormField[];
  }
  
  export interface FormData {
    formTitle: string;
    formId: string;
    version: string;
    sections: FormSection[];
  }
  
  export interface FormResponse {
    message: string;
    form: FormData;
  }
  
  export interface FieldValues {
    [key: string]: string | string[] | boolean;
  }