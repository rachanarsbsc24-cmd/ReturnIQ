function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">

      <div className="brand">

        <div className="brand-icon">
          R
        </div>

        <div>
          <h2>ReturnIQ</h2>
          <span>Return Intelligence</span>
        </div>

      </div>

      <div className="nav-links">

        <button
          className={
            activePage === 'dashboard'
              ? 'nav-link active'
              : 'nav-link'
          }
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>

        <button
          className={
            activePage === 'returns'
              ? 'nav-link active'
              : 'nav-link'
          }
          onClick={() => onNavigate('returns')}
        >
          Returns
        </button>

        <button
          className={
            activePage === 'insights'
              ? 'nav-link active'
              : 'nav-link'
          }
          onClick={() => onNavigate('insights')}
        >
          Insights
        </button>

      </div>

      <div className="nav-status">
        <span className="status-dot"></span>
        System Active
      </div>

    </nav>
  );
}

export default Navbar;