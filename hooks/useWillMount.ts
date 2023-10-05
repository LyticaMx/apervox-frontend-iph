import { useEffect, useRef } from "react";

export const useWillMount = (callback: () => void) => {
    const mounted = useRef(false)
    if (!mounted.current) callback()
  
    useEffect(() => {
      mounted.current = true
    }, []);
}