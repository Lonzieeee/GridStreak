import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Use a timeout so this runs after any internal scroll restoration
    const id = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" in window ? "instant" : "auto",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [pathname]);

  return null;
};

export default ScrollToTop;


