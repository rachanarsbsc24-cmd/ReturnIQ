import { useState } from 'react';

function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onAuthenticated(mode, { name, email, password });
    } catch (err) {
      setError(err.message || 'Unable to continue. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand"><span className="brand-mark">R<span>↗</span></span><div><strong>ReturnIQ</strong><small>RETURN INTELLIGENCE</small></div></div>
        <span className="eyebrow">WORKSPACE ACCESS</span>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth-intro">{mode === 'login' ? 'Sign in to manage your return operations.' : 'Set up your workspace to start managing returns.'}</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" minLength={2} maxLength={60} required /></label>}
          <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={120} required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} maxLength={72} required /><small>Use at least 8 characters.</small></label>
          {error && <p className="form-message error" role="alert">{error}</p>}
          <button className="primary-button auth-submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <p className="auth-switch">{mode === 'login' ? 'New to ReturnIQ?' : 'Already have an account?'} <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}> {mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
      </section>
    </main>
  );
}
export default AuthPage;
