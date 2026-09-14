"use client";

import { useEffect, useState, useCallback } from "react";

export type StoreFetchState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

/**
 * Small fetch hook for the deterministic /api/store/* endpoints used by the
 * chat menu. Deliberately has nothing to do with the AI chat endpoint —
 * these screens must keep working even when Groq/streaming is down.
 *
 * Returns { state, retry } rather than a spread/merged object: keeping
 * `state` as a single discriminated-union value (instead of destructuring
 * `status`/`data` separately at the call site) is what lets
 * `state.status === "success"` actually narrow `state.data` in TypeScript.
 */
export function useStoreFetch<T>(url: string | null): { state: StoreFetchState<T>; retry: () => void } {
  const [state, setState] = useState<StoreFetchState<T>>({ status: "loading" });
  const [nonce, setNonce] = useState(0);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    fetch(url)
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (cancelled) return;
        if (!res.ok || !json || json.error) {
          setState({ status: "error", message: json?.message ?? "Não foi possível carregar agora." });
          return;
        }
        setState({ status: "success", data: json as T });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", message: "Sem conexão com o servidor agora." });
      });

    return () => {
      cancelled = true;
    };
  }, [url, nonce]);

  return { state, retry };
}
