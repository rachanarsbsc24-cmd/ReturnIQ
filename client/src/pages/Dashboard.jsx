import SummaryCard from '../components/SummaryCard';
import ReturnForm from '../components/ReturnForm';
import ReturnTable from '../components/ReturnTable';

function Dashboard({ returns, analytics, onAddReturn, onNavigate }) {
  const recentReturns = returns.slice(0, 5);
  return (
    <main className="page-container dashboard">
      <section className="hero">
        <div className="hero-copy"><span className="hero-kicker"><span /> E-COMMERCE RETURN INTELLIGENCE</span>
          <h1>Make every return<br /><em>a smarter decision.</em></h1>
          <p>Bring return records into one place, uncover recurring product issues, and turn customer feedback into clearer business action.</p>
          <button className="hero-button" onClick={() => onNavigate('returns')}>Explore return records <span>→</span></button>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-core"><span>R</span><small>IQ</small></div><span className="art-label label-top">RETURN DATA</span><span className="art-label label-bottom">ACTIONABLE INSIGHTS</span></div>
        <div className="hero-index">01 <span>/ OVERVIEW</span></div>
      </section>
      <section className="section-intro"><div><span className="eyebrow">AT A GLANCE</span><h2>Return performance snapshot</h2></div><span className="section-caption">Based on {analytics.total} recorded requests</span></section>
      <section className="summary-grid">
        <SummaryCard title="Total returns" value={analytics.total} subtitle="All recorded requests" icon="↩" tone="gold" />
        <SummaryCard title="Pending review" value={analytics.pending} subtitle="Awaiting a decision" icon="◷" tone="blue" />
        <SummaryCard title="Approved" value={analytics.approved} subtitle="Marked as approved" icon="✓" tone="green" />
        <SummaryCard title="Rejected" value={analytics.rejected} subtitle="Marked as rejected" icon="×" tone="rose" />
      </section>
      <section className="section-intro recent-intro"><div><span className="eyebrow">LATEST RECORDS</span><h2>Recent return activity</h2></div><button className="text-button" onClick={() => onNavigate('returns')}>View all records <span>→</span></button></section>
      <ReturnTable returns={recentReturns} />
      <div className="form-section"><ReturnForm onAddReturn={onAddReturn} /></div>
    </main>
  );
}
export default Dashboard;
