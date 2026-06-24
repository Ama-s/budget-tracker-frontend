import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCategories } from '../services/api';
import BudgetOverview from '../components/BudgetOverview';
import ExpenseList from '../components/ExpenseList';
import AddExpenseModal from '../components/AddExpenseModal';
import BudgetSetupModal from '../components/BudgetSetupModal';

function Dashboard() {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleExpenseAdded = () => setRefreshKey(prev => prev + 1);
  const handleBudgetCreated = () => setRefreshKey(prev => prev + 1);

  if (loading) return <div style={{ padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ color: '#FF8855', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', margin: 0 }}>
            💰 Budget Tracker
          </h1>
          <p style={{ color: '#737373', marginTop: '0.5rem' }}>
            Welcome back, {user?.username}!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsBudgetModalOpen(true)}
            style={{
              padding: '0.75rem 1.5rem', background: 'white', color: '#FF8855',
              border: '2px solid #FF8855', borderRadius: '12px', fontSize: '1rem',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#FF8855'; e.target.style.color = 'white'; }}
            onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.color = '#FF8855'; }}
          >
            📊 Setup Budget
          </button>

          <button
            onClick={logout}
            style={{
              padding: '0.75rem 1.5rem', background: 'white', color: '#737373',
              border: '2px solid #E5E5E5', borderRadius: '12px', fontSize: '1rem',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = '#EF4444'; e.target.style.color = '#EF4444'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#E5E5E5'; e.target.style.color = '#737373'; }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <BudgetOverview key={`budget-${refreshKey}`} />
      <ExpenseList key={`expenses-${refreshKey}`} />

      <button
        onClick={() => setIsExpenseModalOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', width: '64px', height: '64px',
          borderRadius: '50%', background: 'linear-gradient(135deg, #FF8855 0%, #E66D3C 100%)',
          color: 'white', border: 'none', fontSize: '2rem', cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', zIndex: 1000
        }}
        onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1) rotate(90deg)'; }}
        onMouseLeave={(e) => { e.target.style.transform = 'scale(1) rotate(0deg)'; }}
      >
        +
      </button>

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        categories={categories}
        onExpenseAdded={handleExpenseAdded}
      />

      <BudgetSetupModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onBudgetCreated={handleBudgetCreated}
      />
    </div>
  );
}

export default Dashboard;