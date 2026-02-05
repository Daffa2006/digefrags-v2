export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token_digefrags_tp2");

  const defaultHeaders = {};

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // If body is plain object -> we want JSON header
  if (options.body && !(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  // If options.body is a plain object and no manual body provided, stringify
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    typeof options.body === "object"
  ) {
    config.body = JSON.stringify(options.body);
  }

  // Debug: log URL in dev
  // console.log("apiFetch:", `${API_BASE_URL}${path}`, config);

  const res = await fetch(`${API_BASE_URL}${path}`, config);

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: res.statusText };
    }
    errorData.status = res.status;
    throw errorData;
  }

  if (res.status === 204) return null;

  return res.json();
}
