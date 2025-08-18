import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import { useEffect, useState } from "react";

const useDetectSmallScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <=  MEDIUM_SIZE_PX;
};

export default useDetectSmallScreen;
