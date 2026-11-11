const API_URL = '/api';
const TOKEN_KEY = 'returniq-token';

export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function saveToken(token) { localStorage.setItem(TOKEN_KEY, token); }
export function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'The request could not be completed.');
  return result;
}

export async function registerAccount(data) { return request('/auth/register', { method: 'POST', body: JSON.stringify(data) }); }
export async function loginAccount(data) { return request('/auth/login', { method: 'POST', body: JSON.stringify(data) }); }
export async function getCurrentUser() { return request('/auth/me'); }
export async function getReturns() { return (await request('/returns')).data; }
export async function createReturn(data) { return (await request('/returns', { method: 'POST', body: JSON.stringify(data) })).data; }
export async function updateReturn(id, updates) { return (await request(`/returns/${id}`, { method: 'PATCH', body: JSON.stringify(updates) })).data; }
export async function deleteReturn(id) { return request(`/returns/${id}`, { method: 'DELETE' }); }
