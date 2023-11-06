import { useEffect } from "react"

export const useCloseWithEsc = (visible: boolean, close: () => void) => {
  return useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        visible && close()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [close, visible])
}
