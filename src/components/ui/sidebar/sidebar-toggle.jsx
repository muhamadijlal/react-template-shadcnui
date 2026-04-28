import { useSidebar } from "@src/hooks/use-sidebar";
import { PiDotsSixVerticalBold } from "react-icons/pi";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label="Toggle sidebar"
      data-slot="toggle-sidebar"
      onClick={toggleSidebar}
      className="fixed bottom-10 z-999999 translate-x-0 cursor-pointer rounded-r-sm bg-white px-0.5 py-2 transition-transform duration-200 ease-linear outline-none group-data-[open=true]/sidebar:translate-x-(--sidebar-width) md:hidden"
    >
      <PiDotsSixVerticalBold className="text-xl" />
    </button>
  );
}
