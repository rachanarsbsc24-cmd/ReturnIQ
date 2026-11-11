import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReturnForm from './components/ReturnForm';
import ReturnTable from './components/ReturnTable';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import mockReturns from './data/mockReturns';

const STORAGE_KEY = 'returniq-returns-v1';

function readReturns() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : mockReturns;
  } catch {
    return mockReturns;
  }
}

function App() {
  const [returns, setReturns] = useState(readReturns);

  const [activePage, setActivePage] = useState(() => {
    const page = window.location.hash.replace('#', '');
    return ['dashboard', 'returns', 'insights'].includes(page)
      ? page
      : 'dashboard';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(returns));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [returns]);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '');
      setActivePage(
        ['dashboard', 'returns', 'insights'].includes(page)
          ? page
          : 'dashboard'
      );
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigation = (page) => {
    setActivePage(page);

    window.history.replaceState(
      null,
      '',
      page === 'dashboard' ? window.location.pathname : `#${page}`
    );
  };

  const handleAddReturn = (newReturn) => {
    setReturns((current) => [newReturn, ...current]);
  };

  const handleUpdateReturn = (id, updates) => {
    setReturns((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const handleDeleteReturn = (id) => {
    setReturns((current) => current.filter((item) => item.id !== id));
  };

  const analytics = useMemo(
    () => ({
      total: returns.length,
      pending: returns.filter((item) => item.status === 'Pending').length,
      approved: returns.filter((item) => item.status === 'Approved').length,
      rejected: returns.filter((item) => item.status === 'Rejected').length,
    }),
    [returns]
  );

  return (
    <div className="app-shell">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {activePage === 'dashboard' && (
        <Dashboard
          returns={returns}
          analytics={analytics}
          onAddReturn={handleAddReturn}
          onNavigate={handleNavigation}
        />
      )}

      {activePage === 'returns' && (
        <main className="page-container">
          <header className="page-heading">
            <div>
              <span className="eyebrow">RETURN OPERATIONS</span>
              <h1>Return records</h1>
              <p>
                Search, review, update and organize customer return requests.
              </p>
            </div>

            <span className="heading-count">
              {analytics.total} records
            </span>
          </header>

          <ReturnTable
            returns={returns}
            onUpdateReturn={handleUpdateReturn}
            onDeleteReturn={handleDeleteReturn}
          />

          <div className="form-section">
            <ReturnForm onAddReturn={handleAddReturn} />
          </div>
        </main>
      )}

      {activePage === 'insights' && (
        <main className="page-container">
          <header className="page-heading">
            <div>
              <span className="eyebrow">DATA &amp; DISCOVERY</span>
              <h1>Return insights</h1>
              <p>
                Explore return reasons, product categories and workflow status.
              </p>
            </div>
          </header>

          <AdvancedAnalytics returns={returns} />
        </main>
      )}

      <footer className="app-footer">
        <span>ReturnIQ</span>
        <span>Return intelligence for better decisions</span>
        <span>Frontend prototype · Local browser data</span>
      </footer>
    </div>
  );
}

export default App;