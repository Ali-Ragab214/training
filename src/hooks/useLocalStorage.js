import { useCallback, useEffect, useState } from 'react'
import { readJSON, writeJSON } from '../services/storage.js'

/**
 * Generic persisted state hook. Reads once on mount, writes on every change.
 * `validate` lets callers reject malformed persisted shapes (fall back to
 * `initial` instead of crashing).
 */
export function useLocalStorage(key, initial, validate = null) {
  const [value, setValue] = useState(() => {
    const stored = readJSON(key, undefined)
    if (stored === undefined) return initial
    if (validate && !validate(stored)) {
      console.warn(`[useLocalStorage] Invalid data in "${key}" — resetting.`)
      return initial
    }
    return stored
  })

  useEffect(() => {
    writeJSON(key, value)
  }, [key, value])

  const reset = useCallback(() => setValue(initial), [initial])

  return [value, setValue, reset]
}
