import React from "react"

interface ErrorProps {
  errorMessage: string
  retryFunction: () => void
}

export default function Error({ errorMessage, retryFunction }: ErrorProps) {
  return (
    <div>
      <h1>Channel manager</h1>
      <div className="text-red-500">{errorMessage}</div>
      <button onClick={() => retryFunction()}>Retry</button>
    </div>
  )
}
