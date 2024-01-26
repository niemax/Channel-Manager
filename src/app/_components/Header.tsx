import React from "react"
import ProductLogo from "./ProductLogo"
import { ThemeSwitcher } from "./ThemeToggle"

export default function Header() {
  return (
    <header className="min-w-full" data-testid="header">
      <div className="flex flex-row justify-between items-center py-4 px-2 border-b-[1px] dark:border-neutral-700">
        <ProductLogo />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
