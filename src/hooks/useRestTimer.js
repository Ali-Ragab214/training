import { useCallback, useEffect, useRef, useState } from 'react'

const TICK_MS = 250

/**
 * Timestamp-based countdown (uses Date.now() deadlines, not interval counting,
 * so background-tab throttling cannot drift the displayed time).
 */
export function useRestTimer(onComplete) {
  const [remaining, setRemaining] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const endsAtRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!isRunning || duration <= 0) return undefined
    const tick = () => {
      const left = Math.max(0, (endsAtRef.current - Date.now()) / 1000)
      setRemaining(Math.ceil(left))
      if (left <= 0) {
        setIsRunning(false)
        onCompleteRef.current?.()
      }
    }
    tick()
    const id = window.setInterval(tick, TICK_MS)
    return () => window.clearInterval(id)
  }, [isRunning, duration])

  const start = useCallback((seconds) => {
    const total = Math.max(1, Math.round(seconds))
    setDuration(total)
    setRemaining(total)
    endsAtRef.current = Date.now() + total * 1000
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning((running) => {
      if (running && endsAtRef.current) {
        setRemaining(Math.ceil(Math.max(0, (endsAtRef.current - Date.now()) / 1000)))
      }
      return false
    })
  }, [])

  const resume = useCallback(() => {
    setIsRunning((running) => {
      if (running || remaining <= 0) return running
      endsAtRef.current = Date.now() + remaining * 1000
      return true
    })
  }, [remaining])

  const reset = useCallback(() => {
    setIsRunning(false)
    setRemaining(0)
    setDuration(0)
    endsAtRef.current = null
  }, [])

  const skip = useCallback(() => {
    setIsRunning(false)
    setRemaining(0)
    setDuration(0)
    endsAtRef.current = null
    onCompleteRef.current?.()
  }, [])

  return {
    remaining,
    duration,
    isRunning,
    isActive: duration > 0,
    start,
    pause,
    resume,
    reset,
    skip,
  }
}
