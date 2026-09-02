function ReasonBreakdown({ returns }) {
  const reasons = [
    'Wrong Size',
    'Damaged',
    'Poor Quality',
    'Not as Described',
    'Changed Mind',
  ];

  return (
    <div className="analytics-card">

      <div className="card-heading">

        <div>
          <span className="eyebrow">
            ANALYSIS
          </span>

          <h2>Return Reasons</h2>
        </div>

        <span className="mini-icon">
          ◉
        </span>

      </div>

      <div className="reason-list">

        {reasons.map((reason) => {
          const count = returns.filter(
            (item) => item.reason === reason
          ).length;

          const percentage =
            returns.length === 0
              ? 0
              : Math.round(
                  (count / returns.length) * 100
                );

          return (
            <div
              className="reason-row"
              key={reason}
            >

              <div className="reason-info">
                <span>{reason}</span>
                <strong>{count}</strong>
              </div>

              <div className="progress-track">

                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <small>
                {percentage}%
              </small>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ReasonBreakdown;