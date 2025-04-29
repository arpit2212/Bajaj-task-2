import { useState } from 'react';
import LoginForm from './components/LoginForm';
import DynamicForm from './components/DynamicForm';
import { User } from './types';
import NavigationBar from './components/NavigationBar';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>(null);
  // Only keep state variables that are actually used in the component

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setFormData(null);
  };

  const handleLoginClick = () => {
    // This function is passed to NavigationBar but doesn't need to modify any state
    // since we're conditionally rendering based on user state
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <div>
      <NavigationBar 
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