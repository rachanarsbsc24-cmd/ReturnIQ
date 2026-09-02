import { useState } from 'react';

function ReturnForm({ onAddReturn }) {
  const [formData, setFormData] = useState({
    product: '',
    customer: '',
    category: 'Electronics',
    reason: 'Wrong Size',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newReturn = {
      id: Date.now(),
      product: formData.product,
      customer: formData.customer,
      category: formData.category,
      reason: formData.reason,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Pending',
    };

    onAddReturn(newReturn);

    setFormData({
      product: '',
      customer: '',
      category: 'Electronics',
      reason: 'Wrong Size',
    });
  };

  return (
    <div className="form-card">

      <div className="form-header">

        <span className="eyebrow">
          NEW RECORD
        </span>

        <h2>Record a Return</h2>

        <p>
          Add a new customer return to ReturnIQ.
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label htmlFor="product">
            Product Name
          </label>

          <input
            id="product"
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g. AirFlex Running Shoes"
            required
          />

        </div>

        <div className="form-group">

          <label htmlFor="customer">
            Customer Name
          </label>

          <input
            id="customer"
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />

        </div>

        <div className="form-group">

          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Footwear</option>
            <option>Home & Lifestyle</option>
          </select>

        </div>

        <div className="form-group">

          <label htmlFor="reason">
            Return Reason
          </label>

          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          >
            <option>Wrong Size</option>
            <option>Damaged</option>
            <option>Poor Quality</option>
            <option>Not as Described</option>
            <option>Changed Mind</option>
          </select>

        </div>

        <button
          type="submit"
          className="primary-button"
        >
          + Add Return
        </button>

      </form>

    </div>
  );
}

export default ReturnForm;