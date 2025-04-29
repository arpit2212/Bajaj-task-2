import { useState, useEffect } from 'react';
import { getForm } from '../api';
import { User, FormData, FieldValues, FormField } from '../types';
import FormSection from './FormSection';
import LoadingSpinner from './LoadingSpinner';

interface DynamicFormProps {
  user: User;
  onSubmit: (values: FieldValues) => void;
  formData: FormData | null;
  setFormData: (formData: FormData | null) => void;
}

const DynamicForm = ({ user, onSubmit, formData, setFormData }: DynamicFormProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [values, setValues] = useState<FieldValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      try {
        const response = await getForm(user.rollNumber);
        setFormData(response.form);
        // Initialize values for fields that need it
        const initialValues: FieldValues = {};
        response.form.sections.forEach(section => {
          section.fields.forEach(field => {
            if (field.type === 'checkbox' && field.options && field.options.length > 0) {
              initialValues[field.fieldId] = [];
            } else if (field.type === 'checkbox') {
              initialValues[field.fieldId] = false;
            } else {
              initialValues[field.fieldId] = '';
            }
          });
        });
        setValues(initialValues);
      } catch (err) {
        setError('Failed to load form data. Please Signup and try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [user.rollNumber, setFormData]);

  const handleInputChange = (fieldId: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error when field is modified
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    // Check if required field is empty
    if (field.required) {
      if (value === undefined || value === null || value === '') {
        return 'This field is required';
      }
      
      if (Array.isArray(value) && value.length === 0) {
        return 'Please select at least one option';
      }
    }
    
    // Check min length
    if (field.minLength !== undefined && typeof value === 'string' && value.length < field.minLength) {
      return `Must be at least ${field.minLength} characters`;
    }
    
    // Check max length
    if (field.maxLength !== undefined && typeof value === 'string' && value.length > field.maxLength) {
      return `Cannot exceed ${field.maxLength} characters`;
    }
    
    // Special validations for specific field types
    switch (field.type) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'tel':
        if (value && !/^\d{10}$/.test(value)) {
          return 'Please enter a valid 10-digit phone number';
        }
        break;
    }
    
    // If there's a custom validation message in the field definition
    if (field.validation && field.validation.message && !value) {
      return field.validation.message;
    }
    
    return null;
  };

  const validateSection = (sectionIndex: number): boolean => {
    if (!formData) return false;
    
    const section = formData.sections[sectionIndex];
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    section.fields.forEach(field => {
      const value = values[field.fieldId];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field.fieldId] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (!formData) return;
    
    const isValid = validateSection(currentSectionIndex);
    if (isValid && currentSectionIndex < formData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (!formData) return;
    
    const isValid = validateSection(currentSectionIndex);
    if (isValid) {
      onSubmit(values);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !formData) {
    return (
      <div className="text-center">
        <p className="text-red-400 mb-4">{error || 'Failed to load form data'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </div>
    );
  }

  const currentSection = formData.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === formData.sections.length - 1;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-blue-400">{formData.formTitle}</h2>
        <div className="text-center text-gray-400 text-sm mt-2">
          <span>Form ID: {formData.formId}</span>
          <span className="mx-2">|</span>
          <span>Version: {formData.version}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {formData.sections.map((section, index) => (
            <div 
              key={section.sectionId} 
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index < currentSectionIndex
                    ? 'bg-green-500 text-white'
                    : index === currentSectionIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-gray-400">{section.title}</span>
            </div>
          ))}
        </div>
        
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-700 w-full"></div>
          <div 
            className="absolute top-0 h-1 bg-blue-500 transition-all" 
            style={{ width: `${((currentSectionIndex + 1) / formData.sections.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <FormSection 
        section={currentSection}
        values={values}
        onChange={handleInputChange}
        errors={errors}
        isLastSection={isLastSection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DynamicForm;