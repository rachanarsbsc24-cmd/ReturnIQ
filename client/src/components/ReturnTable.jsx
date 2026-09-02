function ReturnTable({ returns }) {
  return (
    <div className="table-card">

      <div className="table-heading">

        <div>
          <span className="eyebrow">
            DATABASE VIEW
          </span>

          <h2>All Returns</h2>
        </div>

        <span className="record-count">
          {returns.length} Records
        </span>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {returns.map((item) => (
              <tr key={item.id}>

                <td>
                  <strong>{item.product}</strong>
                </td>

                <td>{item.customer}</td>

                <td>
                  <span className="category-tag">
                    {item.category}
                  </span>
                </td>

                <td>{item.reason}</td>

                <td>{item.date}</td>

                <td>
                  <span className="status pending">
                    {item.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReturnTable;