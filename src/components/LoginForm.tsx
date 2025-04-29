import { useState } from 'react';
import { createUser } from '../api';
import { User } from '../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validateInputs = (): boolean => {
    if (!rollNumber.trim() || !name.trim()) {
      setError('Please enter both roll number and name');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setError(null);

    try {
      const user: User = { rollNumber, name };
      const result = await createUser(user);
      
      if (result.success) {
        setError(null);
        // Show success message but don't login yet
        setError('Account created successfully! You can now login.');
      } else {
        // If user already exists, suggest logging in instead
        if (result.message?.includes('User already exists')) {
          setError('User already exists. You can login with your credentials.');
        } else {
          setError(result.message || 'Sign up failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!validateInputs()) return;
    
    // For login, we'll just pass the user data without creating a new account
    const user: User = { rollNumber, name };
    onLogin(user);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Student Account</h2>
      
      {error && (
        <div className={`${error.includes('successfully') || error.includes('You can login') ? 'bg-green-900/40 border-green-500 text-green-300' : 'bg-red-900/40 border-red-500 text-red-300'} border px-4 py-3 rounded mb-4`}>
          {error}
        </div>
      )}
      
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-300 mb-1">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your roll number"
            required
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              loading 
                ? 'bg-green-700 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            }`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
          
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              loading 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;