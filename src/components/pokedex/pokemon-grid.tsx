import { PokemonCard } from './pokemon-card';
import type { PokemonListItem } from '@/types/api/pokemon.types';

interface PokemonGridProps {
    pokemon: PokemonListItem[];
}

/**
 * Grille responsive de Pokémon (style Pokémon HOME GuideBook).
 * - 2 colonnes en mobile
 * - 3 en tablette étroite
 * - 4 en tablette
 * - 5 en desktop
 * - 6 en grand écran
 */
export function PokemonGrid({ pokemon }: PokemonGridProps) {
    if (pokemon.length === 0) {
        return (
            <div className="home-panel home-empty-state">
                <p className="home-empty-title">Aucun Pokémon trouvé</p>
                <p className="home-empty-desc">
                    Essaie d&apos;ajuster tes filtres ou ta recherche.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 home-fade-in">
            {pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
            ))}
        </div>
    );
}