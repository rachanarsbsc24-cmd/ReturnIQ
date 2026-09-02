import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReturnForm from './components/ReturnForm';
import ReturnTable from './components/ReturnTable';
import ReasonBreakdown from './components/ReasonBreakdown';
import ProductIssues from './components/ProductIssues';

import mockReturns from './data/mockReturns';

function App() {
  const [returns, setReturns] = useState(mockReturns);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#returns') {
        setActivePage('returns');
      } else if (hash === '#insights') {
        setActivePage('insights');
      } else {
        setActivePage('dashboard');
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigation = (page) => {
    setActivePage(page);

    if (page === 'dashboard') {
      window.location.hash = '';
    } else {
      window.location.hash = page;
    }
  };

  const handleAddReturn = (newReturn) => {
    setReturns((previousReturns) => [
      newReturn,
      ...previousReturns,
    ]);
  };

  return (
    <div className="app">

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {activePage === 'dashboard' && (
        <Dashboard
          returns={returns}
          onAddReturn={handleAddReturn}
        />
      )}

      {activePage === 'returns' && (
        <main className="page-placeholder">

          <div className="page-header">
            <span className="eyebrow">
              RETURN MANAGEMENT
            </span>

            <h1>All Return Records</h1>

            <p>
              Browse and monitor all customer return records.
            </p>
          </div>

          <div className="return-page-grid">

            <ReturnTable returns={returns} />

            <ReturnForm
              onAddReturn={handleAddReturn}
            />

          </div>

        </main>
      )}

      {activePage === 'insights' && (
        <main className="page-placeholder">

          <div className="page-header">
            <span className="eyebrow">
              BUSINESS INSIGHTS
            </span>

            <h1>Return Insights</h1>

            <p>
              Analyze return patterns and identify recurring
              product problems.
            </p>
          </div>

          <div className="analytics-grid">

            <ReasonBreakdown returns={returns} />

            <ProductIssues returns={returns} />

          </div>

        </main>
      )}

    </div>
  );
}

export default App;