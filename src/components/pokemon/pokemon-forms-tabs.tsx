import { cn } from '@/lib/utils/cn';
import type { PokemonForm } from '@/types/api/pokemon.types';

interface PokemonFormsTabsProps {
    forms: PokemonForm[];
    activeFormId: number;
    onSelect: (form: PokemonForm) => void;
}

export function PokemonFormsTabs({ forms, activeFormId, onSelect }: PokemonFormsTabsProps) {
    if (forms.length <= 1) return null;

    return (
        <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-secondary)' }}>
                Formes
            </h2>
            <div className="flex flex-wrap gap-2">
                {forms.map((form) => (
                    <button
                        key={form.id}
                        onClick={() => onSelect(form)}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                            form.id === activeFormId
                                ? 'bg-red-600 border-red-600 text-white'
                                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-red-500/50 hover:text-white'
                        )}
                        style={form.id !== activeFormId ? { backgroundColor: 'var(--color-bg-card)' } : {}}
                    >
                        {form.displayName}
                        {form.isDefault && (
                            <span className="ml-1.5 text-xs opacity-60">(défaut)</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}