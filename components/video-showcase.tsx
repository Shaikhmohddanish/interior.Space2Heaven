"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // Track if component is mounted
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      // Pause video when component unmounts to prevent errors
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  const togglePlay = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        // If there's a pending play promise, wait for it to resolve before pausing
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              if (videoRef.current && isMountedRef.current) {
                videoRef.current.pause()
                if (isMountedRef.current) setIsPlaying(false)
              }
            })
            .catch((err) => console.error("Error resolving play promise:", err))
        } else {
          videoRef.current.pause()
          if (isMountedRef.current) setIsPlaying(false)
        }
      } else {
        if (isMountedRef.current) setIsLoading(true)

        // Store the play promise so we can handle it properly
        playPromiseRef.current = videoRef.current.play()

        try {
          await playPromiseRef.current
          if (isMountedRef.current) {
            setIsPlaying(true)
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Video play error:", error)
          if (isMountedRef.current) {
            setIsPlaying(false)
            setIsLoading(false)
          }
        } finally {
          playPromiseRef.current = null
        }
      }
    } catch (error) {
      console.error("Video playback error:", error)
      if (isMountedRef.current) {
        setIsPlaying(false)
        setIsLoading(false)
      }
    }
  }

  const toggleMute = () => {
    if (!videoRef.current || !isMountedRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current || !isMountedRef.current) return
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(currentProgress)
  }

  const handleProgressChange = (value: number[]) => {
    if (!videoRef.current || !isMountedRef.current) return
    const newTime = (value[0] / 100) * videoRef.current.duration
    videoRef.current.currentTime = newTime
    setProgress(value[0])
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current || !isMountedRef.current) return
    setDuration(videoRef.current.duration)
    setIsLoading(false)
  }

  const showControls = () => {
    if (!isMountedRef.current) return
    setIsControlsVisible(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && isMountedRef.current) {
        setIsControlsVisible(false)
      }
    }, 3000)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Clean up timeouts and event listeners
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Design Process</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Watch our design process in action and see how we transform spaces from concept to completion.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-lg bg-black shadow-lg"
          onMouseEnter={showControls}
          onMouseMove={showControls}
          onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
        >
          <div className="aspect-video">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster="/placeholder.svg?height=1080&width=1920"
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => isMountedRef.current && setIsPlaying(false)}
            >
              {/* Use a valid empty source to prevent errors */}
              <source src="data:video/mp4;base64," type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}

            {/* Play/Pause overlay */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300",
                isPlaying && !isControlsVisible ? "opacity-0" : "opacity-100",
              )}
              onClick={togglePlay}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-white bg-white/20 text-white transition-transform duration-300 hover:bg-white/30 hover:scale-110"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 pl-1" />}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"} video</span>
              </Button>
            </div>

            {/* Video controls */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
                isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="flex flex-col gap-2">
                <Slider
                  value={[progress]}
                  min={0}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="cursor-pointer"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="h-8 w-8 text-white hover:bg-white/10"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="h-8 w-8 text-white hover:bg-white/10"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <span className="text-xs text-white">
                      {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Concept Development",
              description:
                "We begin by understanding your needs, preferences, and lifestyle to create a design concept that aligns with your vision.",
            },
            {
              title: "Design Visualization",
              description:
                "Using advanced 3D rendering technology, we bring your space to life before any physical work begins.",
            },
            {
              title: "Flawless Execution",
              description:
                "Our experienced team manages every detail of the implementation process to ensure a seamless experience.",
            },
          ].map((step, index) => (
            <div key={index} className="space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="text-xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
