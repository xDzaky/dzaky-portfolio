'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const colors: Record<string, string> = {
        good: '\x1b[32m',      // Green
        'needs-improvement': '\x1b[33m',  // Yellow
        poor: '\x1b[31m',      // Red
      };
      
      const reset = '\x1b[0m';
      const color = colors[metric.rating || 'good'] || '';
      
      console.log(
        `${color}[${metric.name}]${reset}`,
        `${metric.value.toFixed(2)}ms`,
        `(${metric.rating})`,
        metric
      );
    }

    // Send to Vercel Analytics in production
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', {
        name: metric.name,
        data: {
          value: metric.value,
          rating: metric.rating,
        },
      });
    }
  });

  // Show Web Vitals summary on page unload (dev only)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleBeforeUnload = () => {
      console.log('📊 Web Vitals Summary - Check values above');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}

// Type declaration
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    va?: (event: string, data: any) => void;
  }
}
