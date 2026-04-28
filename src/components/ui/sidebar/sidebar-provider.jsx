import { useEffect, useState } from "react";
import { SidebarContext } from "@context/sidebar-context";

export function SidebarProvider({ children }) {
  const MOBILE_SCREEN_BREAK_POINT = 768;

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_SCREEN_BREAK_POINT,
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_SCREEN_BREAK_POINT;
      setIsMobile(mobile);
      if (!mobile) setOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        isMobile,
        openSidebar: () => isMobile && setOpen(true),
        closeSidebar: () => isMobile && setOpen(false),
        toggleSidebar: () => isMobile && setOpen((p) => !p),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
