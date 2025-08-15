// Performance optimization utilities

// Dynamic import wrapper for lazy loading components
export const lazyImport = <T extends Record<string, any>>(
  factory: () => Promise<T>
) => {
  const LazyComponent = React.lazy(factory);
  
  const WrappedComponent = (props: any) => (
    <React.Suspense fallback={<div className="animate-pulse bg-background-secondary rounded-lg h-32" />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
  
  return WrappedComponent;
};

// Debounce utility for search and input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image preloader for critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Critical resource preloader
export const preloadCriticalResources = async (resources: string[]) => {
  const promises = resources.map(resource => {
    if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
      return preloadImage(resource);
    }
    
    return fetch(resource).then(() => Promise.resolve());
  });
  
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.warn('Some resources failed to preload:', error);
  }
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
    };
  }
  return null;
};

// Performance metrics
export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          request: perfData.responseStart - perfData.requestStart,
          response: perfData.responseEnd - perfData.responseStart,
          domProcessing: perfData.domContentLoadedEventStart - perfData.responseEnd,
          domComplete: perfData.loadEventStart - perfData.domContentLoadedEventStart,
          total: perfData.loadEventEnd - perfData.navigationStart,
        };
        
        console.log('Page Load Metrics:', metrics);
        
        // Send to analytics if needed
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_load_performance', {
            custom_map: {
              total_load_time: metrics.total,
              dom_processing: metrics.domProcessing,
            }
          });
        }
      }, 0);
    });
  }
};

// Web Vitals measurement (requires web-vitals package)
export const measureWebVitals = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    }).catch(() => {
      console.warn('Web Vitals measurement not available');
    });
  }
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Optimize bundle by checking if code is running client-side
export const isClient = typeof window !== 'undefined';
export const isServer = !isClient;

// Resource hints generator
export const generateResourceHints = (urls: string[]) => {
  return urls.map(url => {
    const link = document.createElement('link');
    
    if (url.includes('fonts.googleapis.com')) {
      link.rel = 'preconnect';
    } else if (url.match(/\.(css|js)$/)) {
      link.rel = 'preload';
      link.as = url.endsWith('.css') ? 'style' : 'script';
    } else if (url.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
      link.rel = 'preload';
      link.as = 'image';
    } else {
      link.rel = 'prefetch';
    }
    
    link.href = url;
    document.head.appendChild(link);
    
    return link;
  });
};

import React from 'react';