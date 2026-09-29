/**
 * Loader gate for entrance animations.
 *
 * Problem: mount entrance timelines (hero, page transition, sidebar) start on
 * React mount — while the preloader still covers the screen — so they finish
 * unseen. Solution: build those timelines paused and play them when the
 * preloader signals done.
 *
 * - Preloader calls markLoaderDone() on finish AND on session-skip.
 * - Late subscribers (or repeat views) run immediately via isLoaderDone().
 * - SSR-safe: returns true / no-ops without window.
 */

const DONE_FLAG = "__portfolioLoaderDone";
const DONE_EVENT = "portfolio:loader-done";

type WindowWithFlag = Window & { [DONE_FLAG]?: boolean };

export function isLoaderDone(): boolean {
  if (typeof window === "undefined") return true;
  return (window as WindowWithFlag)[DONE_FLAG] === true;
}

export function markLoaderDone(): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithFlag;
  if (w[DONE_FLAG]) return;
  w[DONE_FLAG] = true;
  window.dispatchEvent(new Event(DONE_EVENT));
}

export function onLoaderDone(cb: () => void): () => void {
  if (isLoaderDone()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(DONE_EVENT, handler);
}
