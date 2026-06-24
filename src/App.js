import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF5F0 0%, #FAFAFA 100%)'
      }}>
        <p style={{ color: '#737373' }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return showRegister
      ? <Register onSwitchToLogin={() => setShowRegister(false)} />
      : <Login onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;