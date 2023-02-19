import { useState, useEffect } from "react";

function useScrollIndicator(ref) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = ref.current;
      console.log(scrollTop, clientHeight, scrollHeight);

      // if (scrollHeight - scrollTop > clientHeight) {
      if (scrollHeight > clientHeight && scrollTop == 0){
        setShowScrollIndicator(true);
      } else {
        setShowScrollIndicator(false);
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return showScrollIndicator;
}

export default useScrollIndicator;
