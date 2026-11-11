function ProductIssues({ returns }) {
  const productCounts = Object.values(returns.reduce((acc, item) => {
    const key = item.product.trim();
    if (!acc[key]) acc[key] = { product: key, count: 0 };
    acc[key].count += 1;
    return acc;
  }, {})).sort((a, b) => b.count - a.count || a.product.localeCompare(b.product)).slice(0, 5);
  return (
    <section className="analytics-card"><div className="card-heading"><div><span className="eyebrow">PRODUCT MONITOR</span><h2>Frequently returned</h2><p>Products with the highest recorded return counts.</p></div><span className="mini-icon">↗</span></div>
      {productCounts.length === 0 ? <p className="muted-empty">Products will appear after return records are added.</p> :
        <div className="product-list">{productCounts.map((item, index) => <div className="product-row" key={item.product}>
          <span className="product-rank">{String(index + 1).padStart(2, '0')}</span><div className="product-name"><strong>{item.product}</strong><span>{item.count} return{item.count === 1 ? '' : 's'} recorded</span></div>
          <span className="product-count">{item.count}</span></div>)}</div>}
      <p className="chart-footnote">Counts show return volume, not return rate.</p>
    </section>
  );
}
export default ProductIssues;
