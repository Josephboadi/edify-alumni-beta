"use client";
import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(
    {
    // width: 1024,
    // height: 768,
  }
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;