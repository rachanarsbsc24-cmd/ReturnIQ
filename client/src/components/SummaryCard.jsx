function SummaryCard({ title, value, subtitle, icon, tone = 'gold' }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top"><span className={`summary-icon ${tone}`}>{icon}</span><span className="summary-label">{title}</span></div>
      <p className="summary-value">{value}</p>
      <p className="summary-subtitle">{subtitle}</p>
    </article>
  );
}
export default SummaryCard;
