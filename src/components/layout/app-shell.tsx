import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
                {children}
            </main>
            <AppFooter />
        </div>
    );
}