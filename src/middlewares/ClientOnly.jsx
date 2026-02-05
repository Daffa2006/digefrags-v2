function getUserFromToken() {
  const token = localStorage.getItem("token_digefrags_tp2");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload; // { id, role }
}

export default function ClientOnly({ children }) {
  const user = getUserFromToken();

  if (user?.role !== 0) return null;

  return children;
}
