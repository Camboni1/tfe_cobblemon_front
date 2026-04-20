import Image from 'next/image';
import { TypeBadge } from '@/components/ui/badge';
import { getSpriteUrl, formatDexNumber, formatGeneration } from '@/lib/utils/pokemon';
import type { PokemonDetails, PokemonForm } from '@/types/api/pokemon.types';

interface PokemonHeroProps {
    pokemon: PokemonDetails;
    activeForm: PokemonForm;
}

export function PokemonHero({ pokemon, activeForm }: PokemonHeroProps) {
    return (
        <div
            className="rounded-2xl border p-8 flex flex-col sm:flex-row items-center gap-8"
            style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
            {/* Sprite */}
            <div className="relative w-40 h-40 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-white/5" />
                {pokemon.implemented ? (
                    <Image
                        src={getSpriteUrl(pokemon.nationalDexNumber)}
                        alt={pokemon.displayName}
                        width={160}
                        height={160}
                        className="object-contain drop-shadow-2xl"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">?</div>
                )}
            </div>

            {/* Infos */}
            <div className="flex-1 text-center sm:text-left space-y-3">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <span className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
            {formatDexNumber(pokemon.nationalDexNumber)}
          </span>
                    {!pokemon.implemented && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
              Non implémenté
            </span>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-white">{pokemon.displayName}</h1>

                {activeForm.displayName !== pokemon.displayName && (
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Forme : {activeForm.displayName}
                    </p>
                )}

                {/* Types */}
                <div className="flex gap-2 justify-center sm:justify-start">
                    <TypeBadge type={activeForm.primaryType} />
                    {activeForm.secondaryType && (
                        <TypeBadge type={activeForm.secondaryType} />
                    )}
                </div>

                {/* Méta */}
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {formatGeneration(pokemon.generationCode)}
                    {activeForm.battleOnly && (
                        <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
              Forme de combat uniquement
            </span>
                    )}
                </p>
            </div>
        </div>
    );
}