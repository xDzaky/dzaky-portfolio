/**
 * Performance optimization utilities
 * For improving INP (Interaction to Next Paint) and general responsiveness
 */

/**
 * Throttle function - limits how often a function can be called
 * @param func - Function to throttle
 * @param limit - Minimum time between calls in ms
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
    return lastResult;
  };
}

/**
 * Request Animation Frame throttle - syncs with browser paint cycles
 * Perfect for scroll/mouse handlers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(this, lastArgs);
        }
        rafId = null;
        lastArgs = null;
      });
    }
  };
}

/**
 * Double RAF throttle - even smoother, skips every other frame
 * Use for very expensive operations
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function doubleRafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (lastArgs) {
            func.apply(this, lastArgs);
          }
          rafId = null;
          lastArgs = null;
        });
      });
    }
  };
}

/**
 * Debounce function - delays execution until after calls have stopped
 * @param func - Function to debounce
 * @param wait - Time to wait after last call in ms
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Passive event listener options for better scroll performance
 */
export const passiveEventOptions: AddEventListenerOptions = {
  passive: true,
  capture: false
};

/**
 * Non-passive event listener options (when preventDefault is needed)
 */
export const nonPassiveEventOptions: AddEventListenerOptions = {
  passive: false,
  capture: false
};

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect low-end device based on hardware capabilities
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  if (cores < 4) return true;
  
  // Check device memory (if available)
  // @ts-expect-error - deviceMemory is not in TypeScript types
  const memory = navigator.deviceMemory;
  if (memory && memory < 4) return true;
  
  // Check connection speed (if available)
  // @ts-expect-error - connection is not in standard types
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    // 2G or slow 3G
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      return true;
    }
    // Save data mode
    if (connection.saveData) return true;
  }
  
  return false;
}

/**
 * Get device performance tier
 */
export function getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';
  
  const cores = navigator.hardwareConcurrency || 2;
  // @ts-expect-error - deviceMemory is not in TypeScript types
  const memory = navigator.deviceMemory || 4;
  
  // High-end: 6+ cores, 8+ GB RAM
  if (cores >= 6 && memory >= 8) return 'high';
  
  // Low-end: <4 cores, <4 GB RAM
  if (cores < 4 || memory < 4) return 'low';
  
  return 'medium';
}

/**
 * Lazy load component with intersection observer
 */
export function createLazyObserver(
  callback: () => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    callback(); // Fallback: load immediately
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
  }, options);

  return observer;
}

/**
 * Optimal debounce timing for different use cases
 */
export const DEBOUNCE_TIMING = {
  SEARCH: 300,      // User typing in search
  RESIZE: 150,      // Window resize
  SCROLL: 100,      // Scroll events
  INPUT: 200,       // Form input validation
} as const;

/**
 * Optimal throttle timing for different use cases
 */
export const THROTTLE_TIMING = {
  SCROLL: 16,       // ~60fps
  MOUSEMOVE: 16,    // ~60fps
  RESIZE: 100,      // Less frequent
  WHEEL: 16,        // Smooth scrolling
} as const;
