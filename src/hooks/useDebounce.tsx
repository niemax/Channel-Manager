import { useEffect, useMemo, useRef } from "react"

function debounce(callback: () => void, wait: number) {
  let timeoutId: number | null = null

  return (...args: any) => {
    window.clearTimeout(timeoutId as number)

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export default function useDebounce(callbackFn: () => void) {
  const ref = useRef()

  useEffect(() => {
    ref.current = callbackFn
  }, [callbackFn])

  const debouncedCallbackFn = useMemo(() => {
    const foo = () => {
      ref.current?.()
    }

    return debounce(foo, 800)
  }, [])

  return debouncedCallbackFn
}
