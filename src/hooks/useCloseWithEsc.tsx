import { useEffect } from "react"

export const useCloseWithEsc = (close: () => void) => {
  return useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [close])
}
