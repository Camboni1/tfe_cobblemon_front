export function AppFooter() {
    return (
        <footer
            className="border-t mt-auto py-8"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
                 style={{ color: 'var(--color-text-secondary)' }}
            >
                <p>CobblemonDex — Projet TFE</p>
                <p>Données basées sur Cobblemon 1.6.1</p>
            </div>
        </footer>
    );
}