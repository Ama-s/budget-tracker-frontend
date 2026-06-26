import { useState, useEffect } from 'react';
import api from '../services/api';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses', {
        params: { page: 0, size: 20 }
      });
      setExpenses(response.data.content || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center',
        color: '#999'
      }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</p>
        <p>No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        marginBottom: '1.5rem',
        color: '#E66D3C',
        fontFamily: 'var(--font-heading)'
      }}>
        Recent Expenses
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {expenses.map(expense => (
          <div 
            key={expense.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: '#FAFAFA',
              borderRadius: '12px',
              borderLeft: `4px solid ${expense.category.color}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: 600,
                color: '#262626',
                marginBottom: '0.25rem'
              }}>
                <span style={{ marginRight: '8px' }}>{expense.category.icon}</span>
                {expense.description}
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: '#737373'
              }}>
                {formatDate(expense.expenseDate)} • {expense.paymentMethod}
                {expense.note && ` • ${expense.note}`}
              </div>
            </div>
            
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#E66D3C',
              fontFamily: 'var(--font-heading)'
            }}>
              -₦{expense.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;