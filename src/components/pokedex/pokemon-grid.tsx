import { PokemonCard } from './pokemon-card';
import type { PokemonListItem } from '@/types/api/pokemon.types';

interface PokemonGridProps {
    pokemon: PokemonListItem[];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
    if (pokemon.length === 0) {
        return (
            <div className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-white">Aucun Pokémon trouvé</p>
                <p className="text-sm mt-1">Essaie de modifier tes filtres</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
            ))}
        </div>
    );
}