import Link from 'next/link';
import { MainNav } from './main-nav';
import { ROUTES } from '@/lib/constants/routes';

export function AppHeader() {
    return (
        <header
            className="sticky top-0 z-50 border-b"
            style={{
                backgroundColor: 'var(--color-bg-nav)',
                borderColor: 'var(--color-border)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link href={ROUTES.home} className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white" />
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
            Cobblemon<span className="text-red-500">Dex</span>
          </span>
                </Link>

                {/* Navigation */}
                <MainNav />

                {/* Lien Admin discret */}
                <Link
                    href={ROUTES.admin.root}
                    className="text-xs text-[#8888aa] hover:text-white transition-colors"
                >
                    Admin
                </Link>
            </div>
        </header>
    );
}