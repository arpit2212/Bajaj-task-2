import { useState } from 'react';
import LoginForm from './components/LoginForm';
import DynamicForm from './components/DynamicForm';
import { User } from './types';
import NavigationBar from './components/NavigationBar';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  const handleLogout = () => {
    setUser(null);
    setFormData(null);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
  };

  return (
     <div> <NavigationBar 
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-xl">
        {!user ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <DynamicForm 
            user={user} 
            onSubmit={handleFormSubmit} 
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
    </div> 
  );
}

export default App;