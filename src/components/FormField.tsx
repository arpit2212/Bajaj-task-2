import { FormField as FormFieldType } from '../types';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  error?: string;
}

const FormField = ({ field, value, onChange, error }: FormFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newValue: string | string[] | boolean = e.target.value;
    
    if (field.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    
    onChange(field.fieldId, newValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, optionValue: string) => {
    const isChecked = e.target.checked;
    let newValue: string[] = Array.isArray(value) ? [...value] : [];
    
    if (isChecked) {
      if (!newValue.includes(optionValue)) {
        newValue.push(optionValue);
      }
    } else {
      newValue = newValue.filter(v => v !== optionValue);
    }
    
    onChange(field.fieldId, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'tel':
      case 'email':
      case 'date':
        return (
          <input
            type={field.type}
            id={field.fieldId}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            data-testid={field.dataTestId}
            maxLength={field.maxLength}
            minLength={field.minLength}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.fieldId}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            data-testid={field.dataTestId}
            maxLength={field.maxLength}
            minLength={field.minLength}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        );
      
      case 'dropdown':
        return (
          <select
            id={field.fieldId}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            data-testid={field.dataTestId}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {field.options?.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                  data-testid={option.dataTestId}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label 
                  htmlFor={`${field.fieldId}-${option.value}`}
                  className="text-sm text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        // Single checkbox
        if (!field.options || field.options.length === 0) {
          return (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={field.fieldId}
                checked={!!value}
                onChange={handleChange}
                required={field.required}
                data-testid={field.dataTestId}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <label 
                htmlFor={field.fieldId}
                className="text-sm text-gray-300"
              >
                {field.label}
              </label>
            </div>
          );
        }
        
        // Multiple checkboxes
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={Array.isArray(value) ? value.includes(option.value) : false}
                  onChange={(e) => handleCheckboxChange(e, option.value)}
                  data-testid={option.dataTestId}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <label 
                  htmlFor={`${field.fieldId}-${option.value}`}
                  className="text-sm text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {field.type !== 'checkbox' || (field.options && field.options.length > 0) ? (
        <label 
          htmlFor={field.fieldId} 
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      ) : null}
      
      {renderField()}
      
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;