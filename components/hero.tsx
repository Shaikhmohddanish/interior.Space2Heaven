"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    
    // Only add mousemove listener on non-mobile devices
    if (!isMobile) {
      document.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (!isMobile) {
        document.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile])

  const calculateTransform = (depth: number) => {
    if (isMobile) return "none"
    return `translate(${mousePosition.x / depth}px, ${mousePosition.y / depth}px)`
  }
