"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ScrollToTopProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Handle all link and button clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickedElement = target.closest("a, button") as HTMLElement

      if (clickedElement) {
        // Don't scroll for elements with data-no-scroll attribute
        if (clickedElement.getAttribute("data-no-scroll") === "true") {
          return
        }

        // Don't scroll for modal controls, dropdowns, etc.
        if (
          clickedElement.getAttribute("role") === "dialog" ||
          clickedElement.closest("[role='dialog']") ||
          clickedElement.getAttribute("aria-haspopup") === "true" ||
          clickedElement.closest("[aria-haspopup='true']")
        ) {
          return
        }

        // Scroll to top smoothly
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [router])

  return <>{children}</>
}
