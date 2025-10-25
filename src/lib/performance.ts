// Performance optimization utilities

// Debounce function to limit API calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit execution frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Simple cache for API responses
class APICache {
  private cache: Map<string, { data: any; timestamp: number }>;
  private ttl: number;

  constructor(ttlSeconds: number = 30) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    // Check if expired
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

// Create cache instances
export const apiCache = new APICache(30); // 30 seconds TTL
export const longCache = new APICache(300); // 5 minutes TTL

// Optimized fetch with caching
export async function cachedFetch(
  url: string,
  options?: RequestInit,
  cacheTTL: number = 30
): Promise<any> {
  const cacheKey = `${url}_${JSON.stringify(options || {})}`;
  
  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Fetch from API
  const response = await fetch(url, options);
  const data = await response.json();
  
  // Store in cache
  apiCache.set(cacheKey, data);
  
  return data;
}

// Lazy load component helper
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

// Preload critical resources
export function preloadResource(url: string, as: string = 'fetch'): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

// Measure performance
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof window === 'undefined') return;
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
}

// Batch API requests
export class RequestBatcher {
  private queue: Array<{
    url: string;
    resolve: (data: any) => void;
    reject: (error: any) => void;
  }> = [];
  private timeout: NodeJS.Timeout | null = null;
  private batchDelay: number;

  constructor(batchDelay: number = 50) {
    this.batchDelay = batchDelay;
  }

  async fetch(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, resolve, reject });
      
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      this.timeout = setTimeout(() => {
        this.processBatch();
      }, this.batchDelay);
    });
  }

  private async processBatch(): Promise<void> {
    const batch = [...this.queue];
    this.queue = [];
    
    // Group by base URL
    const grouped = batch.reduce((acc, item) => {
      const baseUrl = item.url.split('?')[0];
      if (!acc[baseUrl]) {
        acc[baseUrl] = [];
      }
      acc[baseUrl].push(item);
      return acc;
    }, {} as Record<string, typeof batch>);
    
    // Process each group
    for (const [baseUrl, items] of Object.entries(grouped)) {
      try {
        // For now, fetch individually (can be optimized with batch endpoints)
        await Promise.all(
          items.map(async (item) => {
            try {
              const response = await fetch(item.url);
              const data = await response.json();
              item.resolve(data);
            } catch (error) {
              item.reject(error);
            }
          })
        );
      } catch (error) {
        items.forEach((item) => item.reject(error));
      }
    }
  }
}

export const requestBatcher = new RequestBatcher(50);

// Import React for lazy loading
import React from 'react';
