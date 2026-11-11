function ReturnTable({ returns }) {
  const statusClass = (status) => status.toLowerCase().replaceAll(' ', '-');
  return (
    <section className="table-card">
      <div className="table-heading"><div><span className="eyebrow">RETURN REGISTER</span><h2>Return activity</h2>
        <p>A consolidated view of recorded customer returns.</p></div><span className="record-count">{returns.length} total</span></div>
      {returns.length === 0 ? <div className="empty-state"><span>▤</span><strong>No return records yet</strong><p>Add a return using the form to see it here.</p></div> :
        <div className="table-wrapper"><table><thead><tr><th>Product / customer</th><th>Category</th><th>Return reason</th><th>Date recorded</th><th>Status</th></tr></thead>
          <tbody>{returns.map((item) => <tr key={item.id}><td><strong className="table-product">{item.product}</strong><span className="table-customer">{item.customer}</span></td>
            <td><span className="category-tag">{item.category}</span></td><td>{item.reason}</td><td className="date-cell">{item.date}</td>
            <td><span className={`status-pill ${statusClass(item.status)}`}>{item.status}</span></td></tr>)}</tbody></table></div>}
    </section>
  );
}
export default ReturnTable;
