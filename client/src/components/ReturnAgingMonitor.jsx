function ReturnAgingMonitor({ returns, onNavigate }) {
  const today = new Date();

  const overdueReturns = returns
    .filter((item) => {
      if (item.status !== 'Pending' || !item.date) return false;

      const returnDate = new Date(item.date);
      if (Number.isNaN(returnDate.getTime())) return false;

      const ageInDays = Math.floor(
        (today.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      return ageInDays >= 7;
    })
    .map((item) => ({
      ...item,
      ageInDays: Math.floor(
        (today.getTime() - new Date(item.date).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    }))
    .sort((a, b) => b.ageInDays - a.ageInDays);

  return (
    <section className="aging-monitor">
      <div className="aging-heading">
        <div>
          <span className="eyebrow">ATTENTION REQUIRED</span>
          <h2>Overdue return monitor</h2>
          <p>Pending requests waiting for 7 days or longer.</p>
        </div>

        <span className="aging-count">
          {overdueReturns.length} overdue
        </span>
      </div>

      {overdueReturns.length === 0 ? (
        <div className="aging-empty">
          <span>✓</span>
          <div>
            <strong>All clear!</strong>
            <p>There are no pending returns overdue by 7 days or more.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="aging-list">
            {overdueReturns.slice(0, 5).map((item) => (
              <div className="aging-item" key={item.id}>
                <div className="aging-product">
                  <strong>{item.product}</strong>
                  <span>{item.customer}</span>
                </div>

                <div className="aging-reason">
                  <span>{item.reason}</span>
                </div>

                <span className="aging-days">
                  {item.ageInDays} days
                </span>
              </div>
            ))}
          </div>

          {overdueReturns.length > 5 && (
            <p className="aging-more">
              And {overdueReturns.length - 5} more overdue requests.
            </p>
          )}

          <button
            className="aging-action"
            onClick={() => onNavigate('returns')}
          >
            Review return records →
          </button>
        </>
      )}
    </section>
  );
}

export default ReturnAgingMonitor;