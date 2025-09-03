"use client";
import { useCallback, useRef, useState } from "react";

type SaveState = "idle" | "saving" | "saved" | "error";

interface UseLivePersistenceOptions {
  taskId: string;
  dateUTC: string;
  debounceMs?: number;
  onSave?: (patch: Record<string, any>) => Promise<void>;
}

export function useLivePersistence({
  taskId,
  dateUTC,
  debounceMs = 500,
  onSave,
}: UseLivePersistenceOptions) {
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const pendingChangesRef = useRef<Record<string, any>>({});
  const inFlightRequestRef = useRef<AbortController>();

  const saveChanges = useCallback(
    async (patch: Record<string, any>, immediate = false) => {
      // Cancel any in-flight request
      if (inFlightRequestRef.current) {
        inFlightRequestRef.current.abort();
      }

      // Merge with pending changes
      pendingChangesRef.current = { ...pendingChangesRef.current, ...patch };

      if (immediate) {
        // Clear debounce and save immediately
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        await performSave();
      } else {
        // Debounce the save
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(performSave, debounceMs);
      }
    },
    [taskId, dateUTC, debounceMs, onSave]
  );

  const performSave = useCallback(async () => {
    const changes = pendingChangesRef.current;
    if (Object.keys(changes).length === 0) return;

    setSaveState("saving");
    setError(null);

    // Create new abort controller
    inFlightRequestRef.current = new AbortController();

    try {
      if (onSave) {
        await onSave(changes);
      } else {
        // Default API call
        const response = await fetch(`/api/tasks/${taskId}/occurrence`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dateUTC,
            ...changes,
          }),
          signal: inFlightRequestRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to save: ${response.statusText}`);
        }
      }

      // Clear pending changes on success
      pendingChangesRef.current = {};
      setSaveState("saved");

      // Reset to idle after showing "saved" briefly
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // Request was cancelled, don't update state
        return;
      }

      setError(err instanceof Error ? err.message : "Unknown error");
      setSaveState("error");

      // Retry after error
      setTimeout(() => {
        if (Object.keys(pendingChangesRef.current).length > 0) {
          performSave();
        }
      }, 1000);
    }
  }, [taskId, dateUTC, onSave]);

  const flush = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    return performSave();
  }, [performSave]);

  const updateField = useCallback(
    (field: string, value: any, immediate = false) => {
      saveChanges({ [field]: value }, immediate);
    },
    [saveChanges]
  );

  return {
    saveState,
    error,
    updateField,
    flush,
    isDirty: Object.keys(pendingChangesRef.current).length > 0,
  };
}
