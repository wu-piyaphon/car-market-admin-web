import { useEffect, useState } from "react";

/* IMPORTANT: If you change the breakpoint values below,
 * you must also update the corresponding CSS variables in app/app.css
 * to keep breakpoints in sync across JS and CSS.
 */
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < MOBILE_BREAKPOINT;
  const isTablet =
    windowWidth >= MOBILE_BREAKPOINT && windowWidth <= TABLET_BREAKPOINT;
  const isDesktop = windowWidth > TABLET_BREAKPOINT;

  return { isMobile, isTablet, isDesktop };
}
