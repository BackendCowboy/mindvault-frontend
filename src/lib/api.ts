// src/lib/api.ts
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    // try to pull `detail` from FastAPI error body
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.detail || res.statusText);
  }

  return res.json();
}