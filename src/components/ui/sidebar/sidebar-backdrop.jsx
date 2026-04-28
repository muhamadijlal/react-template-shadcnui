import { useSidebar } from "@hooks/use-sidebar";

export function SidebarBackdrop() {
  const { closeSidebar } = useSidebar();
  return (
    <div
      onClick={closeSidebar}
      className="pointer-events-none fixed inset-0 z-9999 bg-black/25 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out group-data-[open=true]/sidebar:pointer-events-auto group-data-[open=true]/sidebar:opacity-100 md:hidden"
    />
  );
}
