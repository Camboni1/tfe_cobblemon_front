'use client';

import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { pokemonApi } from '@/lib/api/pokemon.api';
import { usePokemonFilters } from '@/hooks/use-pokemon-filters';
import { PokedexFilters } from '@/components/pokedex/pokedex-filters';
import { PokemonGrid } from '@/components/pokedex/pokemon-grid';
import { PokemonPagination } from '@/components/pokedex/pokemon-pagination';

function PokedexContent() {
    const { filters, updateFilters } = usePokemonFilters();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['pokemon', filters],
        queryFn: () =>
            pokemonApi.search({
                search: filters.search || undefined,
                generationCode: filters.generationCode || undefined,
                implemented: filters.implemented,
                page: filters.page,
                size: 24,
            }),
        placeholderData: (prev) => prev,
    });

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div>
                <h1 className="text-3xl font-bold text-white">Pokédex</h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Tous les Pokémon disponibles dans Cobblemon
                </p>
            </div>

            {/* Filtres */}
            <PokedexFilters
                filters={filters}
                onUpdate={updateFilters}
                total={data?.totalElements ?? 0}
            />

            {/* Contenu */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {isError && (
                <div className="text-center py-20 text-red-400">
                    <p className="text-lg font-medium">Impossible de charger les Pokémon</p>
                    <p className="text-sm mt-1">Vérifie que le back-end est démarré sur le port 8080</p>
                </div>
            )}

            {data && !isLoading && (
                <>
                    <PokemonGrid pokemon={data.content} />
                    <PokemonPagination
                        currentPage={data.number}
                        totalPages={data.totalPages}
                        onPageChange={(page) => updateFilters({ page })}
                    />
                </>
            )}
        </div>
    );
}

export default function PokedexPage() {
    // Suspense requis pour useSearchParams dans le hook de filtres
    return (
        <Suspense>
            <PokedexContent />
        </Suspense>
    );
}