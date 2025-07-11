'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  const safeValue =
    typeof value === 'number' && isFinite(value)
      ? Math.min(100, Math.max(0, value))
      : 0;

  const transformStyle = React.useMemo(() => {
    const percent = 100 - safeValue;
    return { transform: `translateX(-${percent}%)` };
  }, [safeValue]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={transformStyle}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = 'Progress';

export { Progress };
