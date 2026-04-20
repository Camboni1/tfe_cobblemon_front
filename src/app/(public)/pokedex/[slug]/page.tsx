'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePokemonDetail, usePokemonSpawns } from '@/hooks/use-pokemon-detail';
import { PokemonHero } from '@/components/pokemon/pokemon-hero';
import { PokemonFormsTabs } from '@/components/pokemon/pokemon-forms-tabs';
import { PokemonStats } from '@/components/pokemon/pokemon-stats';
import { PokemonSpawnsSection } from '@/components/pokemon/pokemon-spawns-section';
import { ROUTES } from '@/lib/constants/routes';
import type { PokemonForm } from '@/types/api/pokemon.types';

export default function PokemonDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: pokemon, isLoading, isError } = usePokemonDetail(slug);
    const { data: spawns = [], isLoading: spawnsLoading } = usePokemonSpawns(slug);

    const [activeForm, setActiveForm] = useState<PokemonForm | null>(null);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
                <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-48 rounded-xl bg-white/5 animate-pulse" />
            </div>
        );
    }

    if (isError || !pokemon) {
        return (
            <div className="text-center py-20">
                <p className="text-5xl mb-4">❌</p>
                <p className="text-lg font-medium text-white">Pokémon introuvable</p>
                <Link href={ROUTES.pokedex}
                      className="mt-4 inline-block text-sm text-red-400 hover:text-red-300">
                    ← Retour au Pokédex
                </Link>
            </div>
        );
    }

    const defaultForm = pokemon.forms.find((f) => f.isDefault) ?? pokemon.forms[0];
    const currentForm = activeForm ?? defaultForm;

    return (
        <div className="space-y-8">

            {/* Fil d'Ariane */}
            <nav className="flex items-center gap-2 text-sm"
                 style={{ color: 'var(--color-text-secondary)' }}>
                <Link href={ROUTES.pokedex} className="hover:text-white transition-colors">
                    Pokédex
                </Link>
                <span>›</span>
                <span className="text-white">{pokemon.displayName}</span>
            </nav>

            {/* Héros */}
            <PokemonHero pokemon={pokemon} activeForm={currentForm} />

            {/* Sélecteur de formes */}
            {pokemon.forms.length > 1 && (
                <PokemonFormsTabs
                    forms={pokemon.forms}
                    activeFormId={currentForm.id}
                    onSelect={(form) => setActiveForm(form)}
                />
            )}

            {/* Stats + Spawns en deux colonnes sur grand écran */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PokemonStats form={currentForm} />

                {/* Récap rapide de la forme */}
                <div
                    className="rounded-xl border p-6 space-y-4"
                    style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
                >
                    <h2 className="text-lg font-semibold text-white">Informations</h2>
                    <div className="space-y-2 text-sm">
                        <InfoLine label="Slug" value={pokemon.slug} />
                        <InfoLine label="N° Pokédex" value={`#${pokemon.nationalDexNumber}`} />
                        <InfoLine
                            label="Implémenté"
                            value={pokemon.implemented ? '✅ Oui' : '❌ Non'}
                        />
                        <InfoLine
                            label="Forme de combat"
                            value={currentForm.battleOnly ? 'Oui' : 'Non'}
                        />
                        {pokemon.forms.length > 1 && (
                            <InfoLine label="Nombre de formes" value={String(pokemon.forms.length)} />
                        )}
                    </div>
                </div>
            </div>

            {/* Spawns */}
            <PokemonSpawnsSection
                spawns={spawns.filter(
                    (s) => !currentForm || !s.formCode || s.formCode === currentForm.code
                )}
                isLoading={spawnsLoading}
            />

        </div>
    );
}

function InfoLine({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4">
            <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
            <span className="text-white font-medium text-right">{value}</span>
        </div>
    );
}