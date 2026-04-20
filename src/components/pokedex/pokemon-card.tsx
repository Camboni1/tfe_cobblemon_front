import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/routes';
import { TypeBadge } from '@/components/ui/badge';
import type { PokemonListItem } from '@/types/api/pokemon.types';

interface PokemonCardProps {
    pokemon: PokemonListItem;
}

function getSpriteUrl(dexNumber: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`;
}

function formatDexNumber(n: number): string {
    return `#${String(n).padStart(4, '0')}`;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <Link
            href={ROUTES.pokemon(pokemon.slug)}
            className="group block rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1 hover:border-red-500/50"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
            }}
        >
            {/* Sprite */}
            <div className="relative flex items-center justify-center h-24 mb-3">
                {pokemon.implemented ? (
                    <Image
                        src={getSpriteUrl(pokemon.nationalDexNumber)}
                        alt={pokemon.displayName}
                        width={96}
                        height={96}
                        className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-200"
                        unoptimized
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="text-2xl opacity-30">?</span>
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="text-center space-y-1">
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {formatDexNumber(pokemon.nationalDexNumber)}
                </p>
                <p className="font-semibold text-white text-sm truncate">{pokemon.displayName}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {pokemon.generationCode?.replace('generation', 'Gén. ') ?? '—'}
                </p>
            </div>

            {/* Badge non implémenté */}
            {!pokemon.implemented && (
                <div className="mt-2 text-center">
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
            Non implémenté
          </span>
                </div>
            )}
        </Link>
    );
}