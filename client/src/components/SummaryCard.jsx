function SummaryCard({ title, value, subtitle, icon }) {
  return (
    <div className="summary-card">

      <div className="summary-top">

        <span className="summary-icon">
          {icon}
        </span>

        <span className="summary-label">
          {title}
        </span>

      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>

    </div>
  );
}

export default SummaryCard;