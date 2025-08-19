import React from 'react';

const LoadingSkeleton = ({ className = "", children, ...props }) => {
  return (
    <div 
      className={`skeleton bg-white/5 rounded-lg ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

const ChartSkeleton = () => {
  return (
    <div className="price-chart">
      <div className="chart-header">
        <div className="chart-title">
          <LoadingSkeleton className="h-6 w-48 mb-2" />
          <LoadingSkeleton className="h-4 w-32" />
        </div>
        
        <div className="timeframe-selector">
          {[1, 2, 3, 4, 5].map((i) => (
            <LoadingSkeleton key={i} className="h-8 w-12" />
          ))}
        </div>
      </div>

      <div className="chart-container">
        <div className="relative h-full w-full">
          {/* Grid lines skeleton */}
          <div className="absolute inset-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-white/5"
                style={{ top: `${i * 20}%` }}
              />
            ))}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="absolute h-full border-l border-white/5"
                style={{ left: `${i * 16.66}%` }}
              />
            ))}
          </div>
          
          {/* Chart line skeleton */}
          <div className="absolute inset-4">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <path
                d="M 0 180 Q 50 160 100 140 T 200 100 T 300 80 T 400 60"
                stroke="rgba(0, 212, 170, 0.3)"
                strokeWidth="2"
                fill="none"
                className="chart-skeleton-line"
              />
              {/* Data points skeleton */}
              {[0, 100, 200, 300, 400].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={180 - i * 30}
                  r="3"
                  fill="rgba(0, 212, 170, 0.5)"
                  className="chart-skeleton-point"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="chart-stats">
        <div className="stats-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="stat-item">
              <LoadingSkeleton className="h-4 w-16 mb-2" />
              <LoadingSkeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LoadingSkeleton, ChartSkeleton };
export default LoadingSkeleton;
