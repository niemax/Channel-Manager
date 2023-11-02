import React from "react"
import ProductLogo from "./ProductLogo"

export default function Header() {
  return (
    <header className="min-w-full">
      <div className="flex flex-row py-3 pl-4 border-b-[1px]">
        <ProductLogo />
      </div>
    </header>
  )
}
