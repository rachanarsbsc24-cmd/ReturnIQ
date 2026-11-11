const navigation = [
  { id: 'dashboard', label: 'Overview' },
  { id: 'returns', label: 'Return records' },
  { id: 'insights', label: 'Insights' },
];

function Navbar({ activePage, onNavigate }) {
  return (
    <header className="navbar">
      <button className="brand-button" onClick={() => onNavigate('dashboard')} aria-label="ReturnIQ home">
        <span className="brand-mark">R<span>↗</span></span>
        <span className="brand-copy"><strong>ReturnIQ</strong><small>RETURN INTELLIGENCE</small></span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        {navigation.map((item) => (
          <button key={item.id} className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)} aria-current={activePage === item.id ? 'page' : undefined}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="nav-status"><span className="status-dot" /> Prototype active</div>
    </header>
  );
}

export default Navbar;
