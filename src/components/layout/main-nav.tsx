'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
    { label: 'Pokedex', href: ROUTES.pokedex },
    { label: 'Biomes', href: ROUTES.biomes },
    { label: 'Items', href: ROUTES.items },
];

export function MainNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-2 overflow-x-auto pb-1">
            {NAV_LINKS.map((link) => {
                const isActive =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold transition-all'
                        )}
                        style={
                            isActive
                                ? {
                                    borderColor: 'var(--color-border-strong)',
                                    backgroundColor: 'rgba(116,228,255,0.16)',
                                    color: 'var(--color-text-primary)',
                                }
                                : {
                                    borderColor: 'rgba(120,214,255,0.14)',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    color: 'var(--color-text-secondary)',
                                }
                        }
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
