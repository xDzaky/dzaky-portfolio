// Web Vitals Monitoring
// Install: npm install web-vitals
// Note: FID deprecated in web-vitals v4, use INP instead

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to your analytics in production
  // Example: Vercel Analytics, Google Analytics, etc.
  if (process.env.NODE_ENV === 'production' && window.va) {
    window.va('event', {
      name: metric.name,
      data: {
        value: metric.value,
        rating: metric.rating,
      },
    });
  }
}

export function reportWebVitals() {
  // Core Web Vitals
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID)
  onLCP(sendToAnalytics);  // Largest Contentful Paint

  // Other important metrics
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

// Type declaration for Vercel Analytics
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    va?: (event: string, data: any) => void;
  }
}
