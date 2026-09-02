function ProductIssues({ returns }) {
  const productCounts = {};

  returns.forEach((item) => {
    if (productCounts[item.product]) {
      productCounts[item.product] += 1;
    } else {
      productCounts[item.product] = 1;
    }
  });

  const products = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="analytics-card">

      <div className="card-heading">

        <div>
          <span className="eyebrow">
            PRODUCT MONITOR
          </span>

          <h2>Products Needing Attention</h2>
        </div>

        <span className="mini-icon">
          !
        </span>

      </div>

      <div className="product-list">

        {products.map(([product, count], index) => (
          <div
            className="product-row"
            key={product}
          >

            <div className="product-rank">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="product-name">

              <strong>
                {product}
              </strong>

              <span>
                {count} return{count !== 1 ? 's' : ''}
              </span>

            </div>

            <div className="issue-arrow">
              →
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProductIssues;