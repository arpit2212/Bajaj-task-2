import { User, FormResponse } from './types';

const API_BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

export const createUser = async (user: User): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rollNumber: user.rollNumber,
        name: user.name,
      }),
    });

    const data = await response.json();
    
    // Handle user already exists error specifically (HTTP 409)
    if (response.status === 409) {
      return { 
        success: false, 
        message: 'User already exists. You can login with your credentials.'
      };
    }
    
    if (!response.ok) {
      throw new Error(data.message || `Failed to create user (${response.status})`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

export const getForm = async (rollNumber: string): Promise<FormResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-form?rollNumber=${encodeURIComponent(rollNumber)}`);
    
    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage: string;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `Failed to fetch form (${response.status})`;
      } catch {
        errorMessage = `Failed to fetch form (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const data: FormResponse = await response.json();
    
    // Validate that we received the expected data structure
    if (!data.form || !data.form.sections) {
      throw new Error('Invalid form data received from server');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};