import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { MainNav } from './main-nav';

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 px-4 pt-4">
            <div className="mx-auto max-w-[1500px]">
                <div className="pokedex-panel px-4 py-3 sm:px-5">
                    <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-5">
                            <Link href={ROUTES.home} className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="block h-6 w-1 rounded-full"
                                        style={{ backgroundColor: 'rgba(201, 251, 255, 0.95)' }}
                                    />
                                    <span
                                        className="block h-6 w-1 rounded-full"
                                        style={{ backgroundColor: 'rgba(116, 228, 255, 0.52)' }}
                                    />
                                </div>

                                <span
                                    className="text-xl font-black tracking-[0.28em] sm:text-2xl"
                                    style={{
                                        color: '#d9fcff',
                                        textShadow: '0 0 12px rgba(116,228,255,0.38)',
                                    }}
                                >
                                    POKEDEX
                                </span>
                            </Link>

                            <div
                                className="hidden text-xs font-semibold uppercase tracking-[0.22em] lg:block"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Digital Field Index
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <MainNav />

                            <Link
                                href={ROUTES.admin.root}
                                className="hidden rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] sm:inline-flex"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-secondary)',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                }}
                            >
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
