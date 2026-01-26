import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { apiFetch } from "../helpers";

export const UserProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await apiFetch("/users/me");
        setMe(data);
      } catch {
        setMe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ me, setMe, loading }}>
      {children}
    </UserContext.Provider>
  );
};
