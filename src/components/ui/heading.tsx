import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export function Heading({
  children,
  className,
}: PropsWithChildren<{ className: string }>) {
  return <h1 className={cn('text-center font-bold text-3xl')}>{children}</h1>;
}
