import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function SegmentedProgress({
  value: controlledValue,
  defaultValue = 80,
  onChange,
  segments = 20,
  label,
  showPercentage = true,
  showDemo = false,
  className,
}) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const [displayValue, setDisplayValue] = useState(currentValue);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef(null);
  const startValueRef = useRef(0);
  const startTimeRef = useRef(0);

  const displayValueRef = useRef(displayValue);
  displayValueRef.current = displayValue;

  const filledSegments = Math.round((displayValue / 100) * segments);

  useEffect(() => {
    if (!isInitialized) {
      const initTimeout = setTimeout(() => setIsInitialized(true), 50);
      return () => clearTimeout(initTimeout);
    }

    const duration = 600;
    startValueRef.current = displayValueRef.current;
    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const newValue = startValueRef.current + (currentValue - startValueRef.current) * eased;
      setDisplayValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentValue, isInitialized]);

  const handleSliderChange = (e) => {
    const nextVal = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(nextVal);
    }
    if (onChange) {
      onChange(nextVal);
    }
  };

  const getSegmentStyle = (index) => {
    let scale = 1;
    const opacity = 1;
    let translateY = 0;

    if (hoveredSegment !== null) {
      const distance = Math.abs(hoveredSegment - index);
      if (distance === 0) {
        scale = 1.3;
        translateY = -1;
      } else if (distance <= 3) {
        const falloff = Math.cos((distance / 3) * (Math.PI / 2));
        scale = 1 + 0.2 * falloff;
        translateY = -0.5 * falloff;
      }
    }

    const delay = isInitialized ? index * 15 : 0;

    return {
      transform: `scaleY(${scale}) translateY(${translateY}px)`,
      transitionDelay: `${delay}ms`,
      opacity,
    };
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-2">
        {/* Header with label and percentage */}
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-semibold text-surface-600 tracking-wide uppercase">
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              className="text-sm font-bold text-surface-900 tabular-nums tracking-tight transition-all duration-300 font-mono"
              style={{
                filter: hoveredSegment !== null ? 'brightness(1.2)' : 'brightness(1)',
              }}
            >
              {Math.round(displayValue)}%
            </span>
          )}
        </div>

        {/* Segmented bar */}
        <div
          className="flex gap-[3px] py-1"
          role="progressbar"
          aria-valuenow={currentValue}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: segments }).map((_, index) => {
            const isFilled = index < filledSegments;
            const isHovered = hoveredSegment === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={cn(
                  'h-3 flex-1 rounded-[4px] cursor-pointer origin-center',
                  'transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                  isFilled ? 'bg-primary-600 shadow-2xs' : 'bg-surface-200/80',
                  isHovered && isFilled && 'brightness-110 shadow-[0_0_12px_rgba(222,60,27,0.5)]',
                  isHovered && !isFilled && 'bg-surface-300',
                  hoveredSegment !== null && !isFilled && !isHovered && 'bg-surface-200/50'
                )}
                style={getSegmentStyle(index)}
              />
            );
          })}
        </div>
      </div>

      {showDemo && (
        <div className="flex flex-col gap-2 pt-1">
          <input
            type="range"
            min={0}
            max={100}
            value={currentValue}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-surface-200 rounded-full appearance-none cursor-pointer
              transition-all duration-300
              accent-primary-600
              focus:outline-none"
          />
          <p className="text-center text-[10px] text-surface-400 tracking-wide font-medium">
            Arrastra el deslizador para calibrar el valor
          </p>
        </div>
      )}
    </div>
  );
}

export default SegmentedProgress;
