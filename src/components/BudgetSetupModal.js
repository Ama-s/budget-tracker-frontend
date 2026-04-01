import { useState } from 'react';
import axios from 'axios';

function BudgetSetupModal({ isOpen, onClose, onBudgetCreated }) {
  const [formData, setFormData] = useState({
    monthYear: getCurrentMonthYear(),
    income: '',
    fixedExpenses: '',
    savingsAllocation: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  function getCurrentMonthYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  if (!isOpen) return null;

  const calculateDiscretionary = () => {
    const income = parseFloat(formData.income) || 0;
    const fixed = parseFloat(formData.fixedExpenses) || 0;
    const savings = parseFloat(formData.savingsAllocation) || 0;
    return income - fixed - savings;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const budgetData = {
        ...formData,
        income: parseFloat(formData.income),
        fixedExpenses: parseFloat(formData.fixedExpenses) || 0,
        savingsAllocation: parseFloat(formData.savingsAllocation) || 0
      };

      await axios.post('http://localhost:8085/budgets', budgetData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });

      // Reset form
      setFormData({
        monthYear: getCurrentMonthYear(),
        income: '',
        fixedExpenses: '',
        savingsAllocation: '',
        notes: ''
      });

      onBudgetCreated();
      onClose();
    } catch (err) {
      console.error('Error creating budget:', err);
      alert('Failed to create budget. You may already have a budget for this month.');
    } finally {
      setLoading(false);
    }
  };

  const discretionary = calculateDiscretionary();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          color: '#FF8855',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-heading)'
        }}>
          Set Up Monthly Budget
        </h2>
        <p style={{ color: '#737373', marginBottom: '1.5rem' }}>
          Plan your spending for this month
        </p>

        <form onSubmit={handleSubmit}>
          {/* Month/Year */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Month *
            </label>
            <input
              type="month"
              required
              value={formData.monthYear}
              onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* Income */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Total Income (₦) *
            </label>
            <input
              type="number"
              step="1"
              required
              autoFocus
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              placeholder="250000.00"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
            <small style={{ color: '#737373', fontSize: '0.875rem' }}>
              Your monthly salary or total income
            </small>
          </div>

          {/* Fixed Expenses */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Fixed Expenses (₦)
            </label>
            <input
              type="number"
              step="1"
              value={formData.fixedExpenses}
              onChange={(e) => setFormData({ ...formData, fixedExpenses: e.target.value })}
              placeholder="80000.00"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
            <small style={{ color: '#737373', fontSize: '0.875rem' }}>
              Rent, bills, subscriptions (things you must pay)
            </small>
          </div>

          {/* Savings */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Savings Allocation (₦)
            </label>
            <input
              type="number"
              step="1"
              value={formData.savingsAllocation}
              onChange={(e) => setFormData({ ...formData, savingsAllocation: e.target.value })}
              placeholder="50000.00"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF8855'}
              onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
            />
            <small style={{ color: '#737373', fontSize: '0.875rem' }}>
              How much you want to save this month
            </small>
          </div>

          {/* Discretionary Preview */}
          <div style={{
            background: discretionary >= 0 ? '#F0FDF4' : '#FEF2F2',
            border: `2px solid ${discretionary >= 0 ? '#10B981' : '#EF4444'}`,
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.25rem' }}>
              Free Spending Money
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700,
              color: discretionary >= 0 ? '#10B981' : '#EF4444',
              fontFamily: 'var(--font-heading)'
            }}>
              ₦{discretionary.toLocaleString()}
            </div>
            <small style={{ color: '#737373', fontSize: '0.75rem' }}>
              Income - Fixed Expenses - Savings
            </small>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any notes about this month's budget..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={loading || discretionary < 0}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: (loading || discretionary < 0) ? '#ccc' : 'linear-gradient(135deg, #FF8855 0%, #E66D3C 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: (loading || discretionary < 0) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Creating...' : 'Create Budget'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.875rem 1.5rem',
                background: '#F5F5F5',
                color: '#404040',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetSetupModal;