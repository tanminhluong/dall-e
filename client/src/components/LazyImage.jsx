import React, { useEffect, useRef, useState } from "react";

const LazyImage = (props) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  });
  return inView ? (
    <img {...props} className="w-full h-auto object-cover rounded-xl" />
  ) : (
    <img ref={ref} style={{ backgroundColor: "#ddd" }} />
  );
};

export default LazyImage;
