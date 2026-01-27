import { Outlet } from "react-router";
import Header from "../components/Header";
import { UserProvider } from "../contexts/UserProvider";
import { useEffect } from "react";
import Swal from "sweetalert2";
export default function MainLayout() {
  useEffect(() => {
    Swal.fire({
      title: "Google Analytics Report",
      position: "top",
      customClass: {
        title: "swal-text-small",
        htmlContainer: "swal-text-small",
        confirmButton: "swal-text-small",
      },
      html: `
                       <p>You can view the latest website analytics report here:</p>
                       <a
                         href="https://analytics.google.com/analytics/web/?hl=id#/a381828701p521431195/reports/reportinghub?params=_u..nav%3Dmaui"
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         Ringkasan Laporan
                       </a>
                       <br/>
                         <a
                         href="https://analytics.google.com/analytics/web/?hl=id#/a381828701p521431195/realtime/overview?params=_u..nav%3Dmaui"
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         Ringkasan Realtime
                       </a>
                       <br/>
                         <a
                         href="https://analytics.google.com/analytics/web/?hl=id#/a381828701p521431195/realtime/pages?params=_u..nav%3Dmaui"
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         Halaman Realtime
                       </a>
                       <br/>
                     `,
      confirmButtonText: "Got it",
    });
  }, []);
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
