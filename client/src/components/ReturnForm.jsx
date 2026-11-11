import { useState } from 'react';

const initialForm = { product: '', customer: '', category: 'Electronics', reason: 'Wrong Size' };
const categories = ['Electronics', 'Clothing', 'Footwear', 'Home & Lifestyle'];
const reasons = ['Wrong Size', 'Damaged', 'Poor Quality', 'Not as Described', 'Changed Mind'];

function ReturnForm({ onAddReturn }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = formData.product.trim();
    const customer = formData.customer.trim();
    if (!product || !customer) {
      setError('Please enter both a product name and a customer name.');
      return;
    }
    try {
      await onAddReturn({
        product,
        customer,
        category: formData.category,
        reason: formData.reason,
        date: new Date().toISOString().slice(0, 10),
        status: 'Pending',
      });
      setFormData(initialForm);
      setError('');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Could not save this return record.');
      setSuccess(false);
    }
  };

  return (
    <section className="form-card">
      <div className="form-header"><div><span className="eyebrow">CREATE A RECORD</span><h2>Record a return</h2>
        <p>Capture the details behind a customer's return request.</p></div><span className="form-step">01 / 01</span></div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group"><label htmlFor="product">Product name <span>*</span></label>
            <input id="product" name="product" value={formData.product} onChange={handleChange} placeholder="e.g. AirFlex Running Shoes" maxLength={80} required /></div>
          <div className="form-group"><label htmlFor="customer">Customer name <span>*</span></label>
            <input id="customer" name="customer" value={formData.customer} onChange={handleChange} placeholder="Enter customer name" maxLength={60} required /></div>
          <div className="form-group"><label htmlFor="category">Product category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>{categories.map((value) => <option key={value}>{value}</option>)}</select></div>
          <div className="form-group"><label htmlFor="reason">Return reason</label>
            <select id="reason" name="reason" value={formData.reason} onChange={handleChange}>{reasons.map((value) => <option key={value}>{value}</option>)}</select></div>
        </div>
        {error && <p className="form-message error" role="alert">{error}</p>}
        {success && <p className="form-message success" role="status">Return record added successfully.</p>}
        <div className="form-actions"><p><span>*</span> Required fields</p><button className="primary-button" type="submit"><span>＋</span> Add return record</button></div>
      </form>
    </section>
  );
}
export default ReturnForm;
