"use client";

import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import { useEffect, useState } from "react";

const useIsSmallScreen = () => {
  // const [width, setWidth] = useState(
  //   typeof window !== "undefined" ? window?.innerWidth : null
  // );
  const [width, setWidth] = useState(null);

  const handleWindowSizeChange = () => {
    if (typeof window !== "undefined") {
      setWidth(window?.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);

      if (width === null) {
        setWidth(window?.innerWidth);
      }

      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  return width <= MEDIUM_SIZE_PX && width > 0;
};

export default useIsSmallScreen;
