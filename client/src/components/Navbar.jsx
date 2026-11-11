const navigation = [
  { id: 'dashboard', label: 'Overview', number: '01' },
  { id: 'returns', label: 'Return records', number: '02' },
  { id: 'insights', label: 'Insights', number: '03' },
];

function Navbar({ activePage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="brand-button"
          onClick={() => onNavigate('dashboard')}
          aria-label="ReturnIQ home"
        >
          <span className="brand-mark">
            R<span>↗</span>
          </span>

          <span className="brand-copy">
            <strong>ReturnIQ</strong>
            <small>RETURN INTELLIGENCE</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              <span className="nav-number">{item.number}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-status">
          <span className="status-dot" />
          <span>Workspace active</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;