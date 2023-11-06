import React from "react"

interface ErrorProps {
  errorMessage: string
  retryFunction: () => void
}

export default function Error({ errorMessage, retryFunction }: ErrorProps) {
  return (
    <div data-testid="error-message">
      <h1>Channel manager</h1>
      <div className="text-red-500">{errorMessage}</div>
      <button
        onClick={() => retryFunction()}
        data-testid="retry"
        aria-label="retry"
      >
        Retry
      </button>
    </div>
  )
}
