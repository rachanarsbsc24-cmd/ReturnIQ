import { useMemo, useState } from 'react';

const STATUSES = ['Pending', 'Approved', 'Rejected'];

const REASONS = [
  'Wrong Size',
  'Damaged',
  'Poor Quality',
  'Not as Described',
  'Changed Mind',
];

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Footwear',
  'Home & Lifestyle',
];

function ReturnTable({
  returns,
  onUpdateReturn,
  onDeleteReturn,
  compact = false,
}) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [reasonFilter, setReasonFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  const visibleReturns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...returns]
      .filter(
        (item) =>
          statusFilter === 'All' || item.status === statusFilter
      )
      .filter(
        (item) =>
          reasonFilter === 'All' || item.reason === reasonFilter
      )
      .filter(
        (item) =>
          !normalizedQuery ||
          [
            item.product,
            item.customer,
            item.category,
            item.reason,
            item.id,
          ].some((value) =>
            String(value ?? '').toLowerCase().includes(normalizedQuery)
          )
      )
      .sort((a, b) => {
        if (sortBy === 'product-az') {
          return a.product.localeCompare(b.product);
        }

        if (sortBy === 'product-za') {
          return b.product.localeCompare(a.product);
        }

        if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }

        const dateA = Date.parse(a.date) || 0;
        const dateB = Date.parse(b.date) || 0;

        return dateB - dateA;
      });
  }, [returns, query, statusFilter, reasonFilter, sortBy]);

  const startEdit = (item) => {
    setEditingId(item.id);

    setEditDraft({
      product: item.product,
      customer: item.customer,
      category: item.category,
      reason: item.reason,
    });

    setActionMessage('');
  };

  const saveEdit = (event) => {
    event.preventDefault();

    if (!editDraft.product.trim() || !editDraft.customer.trim()) {
      setActionMessage('Product and customer names are required.');
      return;
    }

    onUpdateReturn(editingId, {
      ...editDraft,
      product: editDraft.product.trim(),
      customer: editDraft.customer.trim(),
    });

    setEditingId(null);
    setEditDraft(null);
    setActionMessage('Return record updated.');
  };

  const removeRecord = (item) => {
    const confirmed = window.confirm(
      `Delete the return record for "${item.product}"? This cannot be undone.`
    );

    if (!confirmed) return;

    onDeleteReturn(item.id);
    setActionMessage('Return record deleted.');
  };

  const changeStatus = (id, status) => {
    onUpdateReturn(id, { status });
    setActionMessage(`Status changed to ${status}.`);
  };

  const statusClass = (status) => status.toLowerCase();

  return (
    <section className="table-card">
      <div className="table-heading">
        <div>
          <span className="eyebrow">RETURN REGISTER</span>

          <h2>
            {compact ? 'Recent return activity' : 'Return activity'}
          </h2>

          <p>
            {compact
              ? 'The latest recorded customer returns.'
              : 'Search, review, edit and update customer return requests.'}
          </p>
        </div>

        <span className="record-count">
          {visibleReturns.length} of {returns.length}
        </span>
      </div>

      {!compact && (
        <div className="table-tools">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search product, customer, category..."
              aria-label="Search return records"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option>All</option>

            {STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <select
            value={reasonFilter}
            onChange={(event) => setReasonFilter(event.target.value)}
            aria-label="Filter by reason"
          >
            <option>All</option>

            {REASONS.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort return records"
          >
            <option value="newest">Newest first</option>
            <option value="product-az">Product A–Z</option>
            <option value="product-za">Product Z–A</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}

      {actionMessage && (
        <p className="table-feedback" role="status">
          {actionMessage}
        </p>
      )}

      {visibleReturns.length === 0 ? (
        <div className="empty-state">
          <span>▤</span>
          <strong>No matching return records</strong>
          <p>
            Try changing your search or filters, or add a new return.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product / customer</th>
                <th>Category</th>
                <th>Return reason</th>
                <th>Date recorded</th>
                <th>Status</th>
                {!compact && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {visibleReturns
                .slice(0, compact ? 5 : undefined)
                .map((item) => (
                  <tr key={item.id}>
                    <td>
                      {editingId === item.id ? (
                        <form className="inline-edit" onSubmit={saveEdit}>
                          <input
                            aria-label="Edit product"
                            value={editDraft.product}
                            onChange={(event) =>
                              setEditDraft({
                                ...editDraft,
                                product: event.target.value,
                              })
                            }
                          />

                          <input
                            aria-label="Edit customer"
                            value={editDraft.customer}
                            onChange={(event) =>
                              setEditDraft({
                                ...editDraft,
                                customer: event.target.value,
                              })
                            }
                          />

                          <button
                            type="submit"
                            className="mini-action save"
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            className="mini-action"
                            onClick={() => {
                              setEditingId(null);
                              setEditDraft(null);
                            }}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <>
                          <strong className="table-product">
                            {item.product}
                          </strong>

                          <span className="table-customer">
                            {item.customer}
                          </span>
                        </>
                      )}
                    </td>

                    <td>
                      {editingId === item.id ? (
                        <select
                          aria-label="Edit category"
                          value={editDraft.category}
                          onChange={(event) =>
                            setEditDraft({
                              ...editDraft,
                              category: event.target.value,
                            })
                          }
                        >
                          {CATEGORIES.map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="category-tag">
                          {item.category}
                        </span>
                      )}
                    </td>

                    <td>
                      {editingId === item.id ? (
                        <select
                          aria-label="Edit reason"
                          value={editDraft.reason}
                          onChange={(event) =>
                            setEditDraft({
                              ...editDraft,
                              reason: event.target.value,
                            })
                          }
                        >
                          {REASONS.map((reason) => (
                            <option key={reason}>{reason}</option>
                          ))}
                        </select>
                      ) : (
                        item.reason
                      )}
                    </td>

                    <td className="date-cell">{item.date}</td>

                    <td>
                      {compact ? (
                        <span
                          className={`status-pill ${statusClass(item.status)}`}
                        >
                          {item.status}
                        </span>
                      ) : (
                        <select
                          className={`status-select ${statusClass(item.status)}`}
                          value={item.status}
                          onChange={(event) =>
                            changeStatus(item.id, event.target.value)
                          }
                          aria-label={`Change status for ${item.product}`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      )}
                    </td>

                    {!compact && (
                      <td>
                        <div className="row-actions">
                          {editingId !== item.id && (
                            <>
                              <button
                                type="button"
                                className="mini-action"
                                onClick={() => startEdit(item)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="mini-action danger"
                                onClick={() => removeRecord(item)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ReturnTable;