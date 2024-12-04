import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return { width: size.width, height: size.height, mdBreakPoint: 768, lgBreakPoint: 992 };
}

export default useWindowSize;
