import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReturnForm from './components/ReturnForm';
import ReturnTable from './components/ReturnTable';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import AuthPage from './components/AuthPage';
import mockReturns from './data/mockReturns';
import { clearToken, createReturn, deleteReturn, getCurrentUser, getReturns, getToken, loginAccount, registerAccount, saveToken, updateReturn } from './services/api';

function App() {
  const initialized = useRef(false);
  const [user, setUser] = useState(null);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(Boolean(getToken()));
  const [appError, setAppError] = useState('');
  const [activePage, setActivePage] = useState(() => {
    const page = window.location.hash.replace('#', '');
    return ['dashboard', 'returns', 'insights'].includes(page) ? page : 'dashboard';
  });

  async function loadWorkspace() {
    const current = await getCurrentUser();
    setUser(current.user);
    let records = await getReturns();
    if (records.length === 0) {
      const legacy = JSON.parse(localStorage.getItem('returniq-returns-v1') || 'null');
      const initialRecords = Array.isArray(legacy) && legacy.length ? legacy : mockReturns;
      for (const item of initialRecords) {
        const { id, _id, ...data } = item;
        records.push(await createReturn({ ...data, date: data.date || new Date().toISOString().slice(0, 10) }));
      }
    }
    setReturns(records);
  }

  useEffect(() => {
    if (initialized.current || !getToken()) return;
    initialized.current = true;
    loadWorkspace().catch((error) => { clearToken(); setUser(null); setAppError(error.message); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '');
      setActivePage(['dashboard', 'returns', 'insights'].includes(page) ? page : 'dashboard');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  async function handleAuthenticated(mode, credentials) {
    const result = mode === 'register' ? await registerAccount(credentials) : await loginAccount(credentials);
    saveToken(result.token);
    setAppError('');
    await loadWorkspace();
  }

  function handleLogout() {
    clearToken(); setUser(null); setReturns([]); setActivePage('dashboard');
    window.history.replaceState(null, '', window.location.pathname);
  }

  const handleNavigation = (page) => {
    setActivePage(page);
    window.history.replaceState(null, '', page === 'dashboard' ? window.location.pathname : `#${page}`);
  };

  async function handleAddReturn(newReturn) {
    try {
      const saved = await createReturn(newReturn);
      setReturns((current) => [saved, ...current]); setAppError(''); return saved;
    } catch (error) { setAppError(error.message); throw error; }
  }
  async function handleUpdateReturn(id, updates) {
    try {
      const saved = await updateReturn(id, updates);
      setReturns((current) => current.map((item) => item.id === id ? saved : item)); setAppError('');
    } catch (error) { setAppError(error.message); }
  }
  async function handleDeleteReturn(id) {
    try {
      await deleteReturn(id); setReturns((current) => current.filter((item) => item.id !== id)); setAppError('');
    } catch (error) { setAppError(error.message); }
  }

  const analytics = useMemo(() => ({
    total: returns.length,
    pending: returns.filter((item) => item.status === 'Pending').length,
    approved: returns.filter((item) => item.status === 'Approved').length,
    rejected: returns.filter((item) => item.status === 'Rejected').length,
  }), [returns]);

  if (loading) return <main className="auth-page"><p>Loading your ReturnIQ workspace…</p></main>;
  if (!user) return <><AuthPage onAuthenticated={handleAuthenticated} />{appError && <p className="auth-global-error">{appError}</p>}</>;

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onNavigate={handleNavigation} user={user} onLogout={handleLogout} />
      {appError && <div className="api-error" role="alert">{appError}</div>}
      {activePage === 'dashboard' && <Dashboard returns={returns} analytics={analytics} onAddReturn={handleAddReturn} onNavigate={handleNavigation} />}
      {activePage === 'returns' && <main className="page-container">
        <header className="page-heading"><div><span className="eyebrow">RETURN OPERATIONS</span><h1>Return records</h1><p>Search, review, update and organize customer return requests.</p></div><span className="heading-count">{analytics.total} records</span></header>
        <ReturnTable returns={returns} onUpdateReturn={handleUpdateReturn} onDeleteReturn={handleDeleteReturn} />
        <div className="form-section"><ReturnForm onAddReturn={handleAddReturn} /></div>
      </main>}
      {activePage === 'insights' && <main className="page-container"><header className="page-heading"><div><span className="eyebrow">DATA &amp; DISCOVERY</span><h1>Return insights</h1><p>Explore return reasons, product categories and workflow status.</p></div></header><AdvancedAnalytics returns={returns} /></main>}
      <footer className="app-footer"><span>ReturnIQ</span><span>Return intelligence for better decisions</span><span>Connected workspace · MongoDB</span></footer>
    </div>
  );
}
export default App;
