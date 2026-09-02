import SummaryCard from '../components/SummaryCard';
import ReturnForm from '../components/ReturnForm';
import ReturnTable from '../components/ReturnTable';

function Dashboard({ returns, onAddReturn }) {
  const totalReturns = returns.length;
  const pendingReturns = returns.filter(
    (item) => item.status === 'Pending'
  ).length;
  const damagedReturns = returns.filter(
    (item) => item.reason === 'Damaged'
  ).length;
  const wrongSizeReturns = returns.filter(
    (item) => item.reason === 'Wrong Size'
  ).length;

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">RETURN INTELLIGENCE</p>
          <h1>Understand why customers return.</h1>
          <p>
            Track return activity, identify recurring issues, and turn return
            data into useful business insights.
          </p>
        </div>
      </section>

      <section className="summary-grid">
        <SummaryCard
          title="Total Returns"
          value={totalReturns}
          subtitle="All recorded returns"
          icon="↩"
        />

        <SummaryCard
          title="Pending Returns"
          value={pendingReturns}
          subtitle="Awaiting review"
          icon="◷"
        />

        <SummaryCard
          title="Damaged"
          value={damagedReturns}
          subtitle="Products reported damaged"
          icon="!"
        />

        <SummaryCard
          title="Wrong Size"
          value={wrongSizeReturns}
          subtitle="Size-related returns"
          icon="⌁"
        />
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">RECENT ACTIVITY</p>
          <h2>Recent Returns</h2>
        </div>
      </section>

      <ReturnTable returns={returns} />

      <ReturnForm onAddReturn={onAddReturn} />
    </main>
  );
}

export default Dashboard;