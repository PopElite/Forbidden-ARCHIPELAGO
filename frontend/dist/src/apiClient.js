const API_BASE = globalThis.FORBIDDEN_ARCHIPELAGO_API ?? 'http://localhost:8787';

export async function fetchBackendHealth() {
  const response = await fetch(`${API_BASE}/api/health`);
  if (!response.ok) throw new Error(`Backend health check failed: ${response.status}`);
  return response.json();
}

export async function fetchSavedGameState() {
  const response = await fetch(`${API_BASE}/api/state`);
  if (!response.ok) throw new Error(`Could not load game state: ${response.status}`);
  return response.json();
}
