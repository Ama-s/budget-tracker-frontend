import { useState } from 'react';
import axios from 'axios';

function AddExpenseModal({ isOpen, onClose, categories, onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    paymentMethod: 'card',
    note: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: parseInt(formData.categoryId)
      };

      await axios.post('http://localhost:8085/expenses', expenseData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });

      // Reset form
      setFormData({
        amount: '',
        description: '',
        categoryId: '',
        paymentMethod: 'card',
        note: ''
      });

      // Notify parent to refresh expenses
      onExpenseAdded();
      onClose();
    } catch (err) {
      console.error('Error creating expense:', err);
      alert('Failed to create expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          color: '#FF8855',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-heading)'
        }}>
          Add Expense
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Amount */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Amount (₦) *
            </label>
            <input
              type="number"
              step="1"
              required
              autoFocus
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
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

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Description *
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What did you spend on?"
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

          {/* Category */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Category *
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
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
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem'
              }}
            >
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>

          {/* Note */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#404040',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Note (optional)
            </label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Additional details"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #FF8855 0%, #E66D3C 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Adding...' : 'Add Expense'}
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

export default AddExpenseModal;