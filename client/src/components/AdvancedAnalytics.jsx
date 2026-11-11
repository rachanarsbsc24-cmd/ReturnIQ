const REASONS = [
  'Wrong Size',
  'Damaged',
  'Poor Quality',
  'Not as Described',
  'Changed Mind',
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function AdvancedAnalytics({ returns }) {
  const total = returns.length;

  const pending = returns.filter(
    (item) => item.status === 'Pending'
  ).length;

  const approved = returns.filter(
    (item) => item.status === 'Approved'
  ).length;

  const rejected = returns.filter(
    (item) => item.status === 'Rejected'
  ).length;

  const resolved = approved + rejected;

  const pendingShare = total
    ? Math.round((pending / total) * 100)
    : 0;

  const resolvedRate = total
    ? Math.round((resolved / total) * 100)
    : 0;

  const reasonCounts = REASONS.map((reason) => ({
    name: reason,
    count: returns.filter((item) => item.reason === reason).length,
  })).sort((a, b) => b.count - a.count);

  const categories = [...new Set(returns.map((item) => item.category))]
    .map((category) => ({
      name: category,
      count: returns.filter((item) => item.category === category).length,
    }))
    .sort((a, b) => b.count - a.count);

  const monthlyCounts = MONTHS.map((month, index) => ({
    month,
    count: returns.filter((item) => {
      const date = new Date(item.date);

      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === index
      );
    }).length,
  }));

  const maxReasonCount = Math.max(
    1,
    ...reasonCounts.map((item) => item.count)
  );

  const maxCategoryCount = Math.max(
    1,
    ...categories.map((item) => item.count)
  );

  const maxMonthlyCount = Math.max(
    1,
    ...monthlyCounts.map((item) => item.count)
  );

  const printReport = () => {
    window.print();
  };

  return (
    <section className="advanced-analytics">
      <div className="analytics-report-heading">
        <div>
          <span className="eyebrow">RETURNIQ REPORT</span>
          <p>
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <button
          type="button"
          className="export-button print-button"
          onClick={printReport}
        >
          ⎙ Print / Save PDF
        </button>
      </div>

      <div className="analytics-kpis">
        <article>
          <span>Total requests</span>
          <strong>{total}</strong>
          <small>All recorded return requests</small>
        </article>

        <article>
          <span>Pending share</span>
          <strong>{pendingShare}%</strong>
          <small>{pending} requests awaiting review</small>
        </article>

        <article>
          <span>Resolved requests</span>
          <strong>{resolvedRate}%</strong>
          <small>{resolved} approved or rejected</small>
        </article>

        <article>
          <span>Approved requests</span>
          <strong>{approved}</strong>
          <small>{rejected} rejected requests</small>
        </article>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">CUSTOMER FEEDBACK</span>
              <h2>Return reasons</h2>
            </div>
            <span className="mini-icon">↗</span>
          </div>

          {total === 0 ? (
            <p className="muted-empty">
              No return reason data available yet.
            </p>
          ) : (
            reasonCounts.map((item) => (
              <div className="reason-row" key={item.name}>
                <div className="reason-info">
                  <span>{item.name}</span>
                  <strong>
                    {item.count}
                    <small>
                      {' '}
                      ({Math.round((item.count / total) * 100)}%)
                    </small>
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(item.count / maxReasonCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </article>

        <article className="analytics-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">PRODUCT GROUPS</span>
              <h2>Category breakdown</h2>
            </div>
            <span className="mini-icon">▦</span>
          </div>

          {categories.length === 0 ? (
            <p className="muted-empty">
              No category data available yet.
            </p>
          ) : (
            categories.map((item) => (
              <div className="reason-row" key={item.name}>
                <div className="reason-info">
                  <span>{item.name}</span>
                  <strong>{item.count}</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar category-bar"
                    style={{
                      width: `${(item.count / maxCategoryCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </article>

        <article className="analytics-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">RETURN HISTORY</span>
              <h2>Monthly return records</h2>
            </div>
            <span className="mini-icon">▥</span>
          </div>

          <div className="monthly-chart">
            {monthlyCounts.map((item) => (
              <div className="month-column" key={item.month}>
                <span className="month-value">
                  {item.count || ''}
                </span>

                <div className="month-track">
                  <div
                    className="month-bar"
                    style={{
                      height: `${(item.count / maxMonthlyCount) * 100}%`,
                    }}
                  />
                </div>

                <span className="month-label">{item.month}</span>
              </div>
            ))}
          </div>

          <p className="chart-footnote">
            Number of return records by calendar month.
          </p>
        </article>

        <article className="analytics-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">WORKFLOW OVERVIEW</span>
              <h2>Request status</h2>
            </div>
            <span className="mini-icon">◷</span>
          </div>

          {[
            {
              name: 'Pending',
              count: pending,
              className: 'pending',
            },
            {
              name: 'Approved',
              count: approved,
              className: 'approved',
            },
            {
              name: 'Rejected',
              count: rejected,
              className: 'rejected',
            },
          ].map((item) => (
            <div className="status-analysis-row" key={item.name}>
              <div>
                <span
                  className={`status-dot status-${item.className}`}
                />
                <span>{item.name}</span>
              </div>

              <strong>{item.count}</strong>
            </div>
          ))}

          <div className="status-stack">
            <span
              className="stack-pending"
              style={{
                width: `${total ? (pending / total) * 100 : 0}%`,
              }}
            />

            <span
              className="stack-approved"
              style={{
                width: `${total ? (approved / total) * 100 : 0}%`,
              }}
            />

            <span
              className="stack-rejected"
              style={{
                width: `${total ? (rejected / total) * 100 : 0}%`,
              }}
            />
          </div>
        </article>
      </div>

      <p className="analytics-disclaimer">
        These analytics are based on return records currently stored in
        this browser. Product counts represent recorded returns, not return
        rates, because sales-volume data is not included.
      </p>
    </section>
  );
}

export default AdvancedAnalytics;