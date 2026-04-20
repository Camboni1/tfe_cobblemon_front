'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
    { label: 'Pokédex', href: ROUTES.pokedex },
    { label: 'Biomes', href: ROUTES.biomes },
    { label: 'Items', href: ROUTES.items },
];

export function MainNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            isActive
                                ? 'bg-red-600 text-white'
                                : 'text-[#8888aa] hover:text-white hover:bg-white/10'
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}