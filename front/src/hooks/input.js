import { useCallback, useState } from "react"

export const useInput = (init = null) => {
  const [value, setter] = useState(init);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
}