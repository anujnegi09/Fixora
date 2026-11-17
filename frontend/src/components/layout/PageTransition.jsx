import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const pageRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "all" },
      );
    }, pageRef);

    return () => context.revert();
  }, [location.pathname]);

  return <div ref={pageRef} className="page-transition-content">{children}</div>;
};

export default PageTransition;
