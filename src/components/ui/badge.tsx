import { cn } from '@/lib/utils/cn';
import { TYPE_COLORS } from '@/lib/constants/filters';

interface TypeBadgeProps {
    type: string;
    className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
    const colorClass = TYPE_COLORS[type.toLowerCase()] ?? 'bg-gray-500';
    return (
        <span
            className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide text-white',
                colorClass,
                className
            )}
        >
      {type}
    </span>
    );
}