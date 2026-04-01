import { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetOverview() {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('http://localhost:8085/budgets/remaining');
        setBudgetData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching budget:', err);
        setLoading(false);
      }
    };

    fetchBudget();
  }, []);

  if (loading) return <div>Loading budget...</div>;
  if (!budgetData) return <div>No budget set for this month</div>;

  const { remaining, miscellaneousSpend, totalSpent, percentage, status } = budgetData;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FF8855 0%, #FFBF00 100%)',
      color: 'white',
      borderRadius: '32px',
      padding: '2rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      marginBottom: '2rem'
    }}>
      <div style={{ fontSize: '0.875rem', opacity: 0.9, textTransform: 'uppercase' }}>
        Remaining Money for this month
      </div>
      
      <div style={{ 
        fontSize: '3rem', 
        fontFamily: 'Montserrat', 
        fontWeight: 'bold',
        margin: '1rem 0'
      }}>
        ₦{remaining.toLocaleString()}
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        height: '12px',
        margin: '1rem 0',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.min(percentage, 100)}%`,
          height: '100%',
          background: status === 'safe' ? '#10B981' : 
                     status === 'caution' ? '#F59E0B' : '#EF4444',
          borderRadius: '20px',
          transition: 'width 0.6s ease'
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.0rem', opacity: 0.9 }}>
        <span>Spent: ₦{totalSpent.toLocaleString()}</span>
        <span>Budget: ₦{miscellaneousSpend.toLocaleString()}</span>
      </div>

      <div style={{
        display: 'inline-block',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.875rem',
        fontWeight: 600,
        marginTop: '1rem',
        background: status === 'safe' ? '#10B981' : 
                   status === 'caution' ? '#F59E0B' : '#EF4444'
      }}>
        {status === 'safe' ? '✓ On Track' : 
         status === 'caution' ? '⚠ Careful' : '⚠ Over Budget'}
      </div>
    </div>
  );
}

export default BudgetOverview;