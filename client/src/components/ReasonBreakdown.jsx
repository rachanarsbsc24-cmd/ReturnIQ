const reasons = ['Wrong Size', 'Damaged', 'Poor Quality', 'Not as Described', 'Changed Mind'];
function ReasonBreakdown({ returns }) {
  const counts = reasons.map((reason) => ({ reason, count: returns.filter((item) => item.reason === reason).length }));
  const maxCount = Math.max(1, ...counts.map((item) => item.count));
  return (
    <section className="analytics-card"><div className="card-heading"><div><span className="eyebrow">WHY RETURNS HAPPEN</span><h2>Return reasons</h2><p>Distribution across recorded return requests.</p></div><span className="mini-icon">◉</span></div>
      {returns.length === 0 ? <p className="muted-empty">No data available yet.</p> :
        <div className="reason-list">{counts.map(({ reason, count }) => {
          const percentage = returns.length ? Math.round((count / returns.length) * 100) : 0;
          return <div className="reason-row" key={reason}><div className="reason-info"><span>{reason}</span><strong>{count} <small>({percentage}%)</small></strong></div>
            <div className="progress-track" role="progressbar" aria-label={`${reason} share`} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"><div className="progress-bar" style={{ width: `${(count / maxCount) * 100}%` }} /></div></div>;
        })}</div>}
      <p className="chart-footnote">Percentages are based on all recorded returns.</p>
    </section>
  );
}
export default ReasonBreakdown;
