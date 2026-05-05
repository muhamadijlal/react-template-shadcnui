import { showAlert } from "@src/components/ui/toaster/show-alert";
import { IoChatboxEllipses } from "react-icons/io5";

function showTrendingToast() {
  showAlert("danger", {
    title: "Info",
    description: "Ini adalah informasi",
  });
  //   showAlert("warning", {
  //     title: "Peringatan",
  //     description: "Data belum lengkap",
  //     actionLabel: "Lengkapi",
  //     onAction: () => console.log("klik"),
  //   });
  //   showAlert("warning", {
  //     title: "Trending Topic",
  //     main: "Jalan Tol",
  //     sub: "2.300 artikel",
  //     actionLabel: "Lihat Semua",
  //     onAction: () => console.log("lihat semua"),
  //     icon: <IoChatboxEllipses className="h-5 w-5" />,
  //   });
}

function DashboardPage() {
  return <button onClick={showTrendingToast}>Show Toast</button>;
}

export default DashboardPage;
