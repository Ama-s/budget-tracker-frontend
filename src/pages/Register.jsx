import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Register({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email || null,
        password: formData.password,
        fullName: formData.fullName || null
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Username may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem',
    border: '2px solid #E5E5E5',
    borderRadius: '12px',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 600,
    color: '#404040',
    marginBottom: '0.5rem',
    fontSize: '0.875rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF5F0 0%, #FAFAFA 100%)',
      padding: '20px',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h1 style={{
          color: '#FF8855',
          fontFamily: 'var(--font-heading)',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          💰 Budget Tracker
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#737373',
          marginBottom: '2rem'
        }}>
          Create your account to start tracking!
        </p>

        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '2px solid #EF4444',
            color: '#DC2626',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Username *</label>
            <input
              type="text"
              required
              autoFocus
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Choose a username"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Full Name (optional)</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your full name"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Email (optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 6 characters"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Confirm Password *</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Re-enter password"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #FF8855 0%, #E66D3C 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div style={{ textAlign: 'center', color: '#737373', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF8855',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'var(--font-body)'
              }}
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;