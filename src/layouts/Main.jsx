import { Outlet } from "react-router";
import Header from "../components/Header";
import { UserProvider } from "../contexts/UserProvider";
export default function MainLayout() {
  return (
    <UserProvider>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
}
