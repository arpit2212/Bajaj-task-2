import { FormSection as FormSectionType, FieldValues } from '../types';
import FormField from './FormField';

interface FormSectionProps {
  section: FormSectionType;
  values: FieldValues;
  onChange: (fieldId: string, value: any) => void;
  errors: Record<string, string>;
  isLastSection: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormSection = ({ 
  section, 
  values, 
  onChange, 
  errors, 
  isLastSection, 
  onPrevious, 
  onNext, 
  onSubmit 
}: FormSectionProps) => {
  const handleNextOrSubmit = () => {
    if (isLastSection) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2 text-blue-400">{section.title}</h3>
      <p className="text-gray-300 mb-6">{section.description}</p>
      
      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={values[field.fieldId]}
            onChange={onChange}
            error={errors[field.fieldId]}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={handleNextOrSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {isLastSection ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FormSection;