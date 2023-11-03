import { useEffect } from "react"

export const useCloseWithEsc = (close: () => void) => {
  return useEffect(() => {
    const toggle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggle()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [close])
}
