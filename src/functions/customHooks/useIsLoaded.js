import { useState, useEffect } from "react";

const useIsLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return isLoaded;
};

export default useIsLoaded;
