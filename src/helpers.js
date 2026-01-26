export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-digefrags-v2-production.up.railway.app/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const res = await fetch(`${API_BASE_URL}${path}`, config);

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: res.statusText };
    }
    errorData.status = res.status; // tambahkan status untuk komponen
    throw errorData;
  }

  if (res.status === 204) return null;

  return res.json();
}
