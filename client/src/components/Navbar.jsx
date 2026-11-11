const navigation = [
  { id: 'dashboard', label: 'Overview' },
  { id: 'returns', label: 'Return records' },
  { id: 'insights', label: 'Insights' },
];

function Navbar({ activePage, onNavigate, user, onLogout }) {
  return (
    <header className="navbar">
      <button className="brand-button" onClick={() => onNavigate('dashboard')} aria-label="ReturnIQ home">
        <span className="brand-mark">R<span>↗</span></span>
        <span className="brand-copy"><strong>ReturnIQ</strong><small>RETURN INTELLIGENCE</small></span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        {navigation.map((item) => <button key={item.id} className={`nav-link ${activePage === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)} aria-current={activePage === item.id ? 'page' : undefined}>{item.label}</button>)}
      </nav>
      <div className="nav-account"><span className="nav-user">{user?.name}</span><button className="logout-button" onClick={onLogout}>Sign out</button></div>
    </header>
  );
}
export default Navbar;
