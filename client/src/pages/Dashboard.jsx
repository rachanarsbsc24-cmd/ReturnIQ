import SummaryCard from '../components/SummaryCard';
import ReturnForm from '../components/ReturnForm';
import ReturnTable from '../components/ReturnTable';
import ReasonBreakdown from '../components/ReasonBreakdown';
import ProductIssues from '../components/ProductIssues';

function Dashboard({
  returns,
  analytics,
  onAddReturn,
  onNavigate,
}) {
  return (
    <main className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">RETURN INTELLIGENCE PLATFORM</span>

          <h1>
            Understand returns.
            <br />
            Improve decisions.
          </h1>

          <p>
            Monitor customer return activity, identify recurring issues
            and turn return records into useful business insights.
          </p>

          <button
            className="hero-button"
            type="button"
            onClick={() => onNavigate('returns')}
          >
            Explore return records <span>→</span>
          </button>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-circle">
            <span>RI</span>
          </div>
        </div>

        <span className="hero-index">01 / RETURN OVERVIEW</span>
      </section>

      <section className="dashboard-section">
        <div className="section-intro">
          <div>
            <span className="eyebrow">AT A GLANCE</span>
            <h2>Return overview</h2>
          </div>

          <span className="section-caption">
            Summary of recorded return requests
          </span>
        </div>

        <div className="summary-grid">
          <SummaryCard
            label="Total returns"
            value={analytics.total}
            detail="All recorded requests"
          />

          <SummaryCard
            label="Pending"
            value={analytics.pending}
            detail="Awaiting review"
          />

          <SummaryCard
            label="Approved"
            value={analytics.approved}
            detail="Accepted requests"
          />

          <SummaryCard
            label="Rejected"
            value={analytics.rejected}
            detail="Declined requests"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-intro">
          <div>
            <span className="eyebrow">RECENT ACTIVITY</span>
            <h2>Latest return requests</h2>
          </div>

          <button
            className="text-button"
            type="button"
            onClick={() => onNavigate('returns')}
          >
            View all records →
          </button>
        </div>

        <ReturnTable returns={returns} compact />
      </section>

      <section className="dashboard-insights">
        <ReasonBreakdown returns={returns} />
        <ProductIssues returns={returns} />
      </section>

      <section className="dashboard-section">
        <div className="section-intro">
          <div>
            <span className="eyebrow">ADD A RECORD</span>
            <h2>Record a new return</h2>
          </div>
        </div>

        <ReturnForm onAddReturn={onAddReturn} />
      </section>
    </main>
  );
}

export default Dashboard;