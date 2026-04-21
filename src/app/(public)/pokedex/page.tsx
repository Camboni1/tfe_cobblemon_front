'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {Suspense, useEffect, useMemo, useState} from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { usePokemonFilters } from '@/hooks/use-pokemon-filters';
import { pokemonApi } from '@/lib/api/pokemon.api';
import { ROUTES } from '@/lib/constants/routes';
import type { PokemonListItem } from '@/types/api/pokemon.types';
import {entries} from "eslint-config-next";

const GENERATION_CHOICES = [
    { value: '', label: 'All generations' },
    { value: 'GEN_1', label: 'Generation I' },
    { value: 'GEN_2', label: 'Generation II' },
    { value: 'GEN_3', label: 'Generation III' },
    { value: 'GEN_4', label: 'Generation IV' },
    { value: 'GEN_5', label: 'Generation V' },
    { value: 'GEN_6', label: 'Generation VI' },
    { value: 'GEN_7', label: 'Generation VII' },
    { value: 'GEN_8', label: 'Generation VIII' },
    { value: 'GEN_9', label: 'Generation IX' },
] as const;

function PokedexContent() {
    const { filters, updateFilters } = usePokemonFilters();
    const [searchInput, setSearchInput] = useState(filters.search);
    const debouncedSearch = useDebounce(searchInput, 400);
    const [activeSlug, setActiveSlug] = useState('');

    useEffect(() => {
        setSearchInput(filters.search);
    }, [filters.search]);

    useEffect(() => {
        if (debouncedSearch !== filters.search) {
            updateFilters({ search: debouncedSearch });
        }
    }, [debouncedSearch, filters.search, updateFilters]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['pokemon', filters],
        queryFn: () =>
            pokemonApi.search({
                search: filters.search || undefined,
                generationCode: filters.generationCode || undefined,
                implemented: filters.implemented,
                page: filters.page,
                size: 1200,
            }),
        placeholderData: (prev) => prev,
    });

    const entries = data?.content ?? [];
    const sortedEntries = useMemo(() => {
        return [...entries].sort(
            (a, b) => a.nationalDexNumber - b.nationalDexNumber
        );
    }, [entries]);

    useEffect(() => {
        if (entries.length === 0) {
            if (activeSlug) setActiveSlug('');
            return;
        }

        if (!entries.some((pokemon) => pokemon.slug === activeSlug)) {
            setActiveSlug(entries[0].slug);
        }
    }, [entries, activeSlug]);

    const activePokemon =
        entries.find((pokemon) => pokemon.slug === activeSlug) ?? entries[0] ?? null;

    const implementedCount = entries.filter((pokemon) => pokemon.implemented).length;

    return (
        <div className="space-y-4">
            <section className="pokedex-panel px-4 py-3 sm:px-5">
                <div className="relative z-10 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap gap-2">
                        <span className="pokedex-tab pokedex-tab-active">Pokedex</span>
                        <span className="pokedex-tab">Mega Evolution Pokedex</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="pokedex-chip">
                            {padCounter(implementedCount)} active
                        </span>
                        <span className="pokedex-chip">
                            {padCounter(data?.totalElements ?? 0)} indexed
                        </span>
                    </div>
                </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.02fr)_minmax(430px,0.98fr)]">
                <section className="pokedex-panel pokedex-stage p-5 sm:p-8">
                    <div className="pokedex-corners" />
                    <div className="pokedex-corners-alt" />
                    <div className="pokedex-scanline" />
                    {activePokemon ? (
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
                                <span className="pokedex-chip">
                                    No. {formatDexNumber(activePokemon.nationalDexNumber)}
                                </span>
                                <span className="pokedex-chip">
                                    {formatGeneration(activePokemon.generationCode)}
                                </span>
                            </div>

                            <div className="relative flex flex-1 items-center justify-center py-8">
                                <div className="pokedex-stage-aura" />
                                <div className="pokedex-stage-platform" />

                                {activePokemon.implemented ? (
                                    <Image
                                        key={activePokemon.slug}  /* ← déclenche l'animation d'entrée à chaque switch */
                                        src={imageSrc(activePokemon)}
                                        alt={activePokemon.displayName}
                                        width={360}
                                        height={360}
                                        unoptimized
                                        className="pokedex-stage-sprite relative z-10 max-h-[420px] w-auto object-contain drop-shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
                                    />
                                ) : (
                                    <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/5 text-8xl font-black text-white/20">
                                        ?
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row text-center sm:items-end sm:justify-between">
                                <div>
                                    <span
                                        className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.06)',
                                            color: 'var(--color-text-secondary)',
                                        }}
                                    >
                                        {activePokemon.implemented ? 'Entry ready' : 'Entry incomplete'}
                                    </span>

                                    <h1 className="pokedex-stage-title mt-3 text-3xl font-black text-white sm:text-4xl">
                                        {activePokemon.displayName}
                                    </h1>

                                    <p
                                        className="mt-1 text-sm"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        {formatGeneration(activePokemon.generationCode)} • #
                                        {formatDexNumber(activePokemon.nationalDexNumber)}
                                    </p>
                                </div>

                                <Link
                                    href={ROUTES.pokemon(activePokemon.slug)}
                                    className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:text-white"
                                    style={{
                                        borderColor: 'var(--color-border-strong)',
                                        backgroundColor: 'rgba(116,228,255,0.12)',
                                        color: 'var(--color-text-primary)',
                                    }}
                                >
                                    Check Entry
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 flex h-full min-h-[520px] items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-white">No entry loaded</p>
                                <p
                                    className="mt-2 text-sm"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Adjust filters to display a Pokemon entry.
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="pokedex-panel p-4 sm:p-5">
                    <div className="relative z-10">
                        <div
                            className="flex flex-col gap-4 border-b pb-4 xl:flex-row xl:items-center xl:justify-between"
                            style={{ borderColor: 'rgba(120,214,255,0.12)' }}
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="pokedex-chip">
                                    Page {padCounter((data?.number ?? 0) + 1)}
                                </span>
                                <span className="pokedex-chip">
                                    {padCounter(entries.length)} visible
                                </span>
                            </div>

                            <div
                                className="text-xs font-semibold uppercase tracking-[0.22em]"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Sort by number
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="Search Pokemon"
                                className="pokedex-field"
                            />

                            <select
                                value={filters.generationCode}
                                onChange={(event) =>
                                    updateFilters({ generationCode: event.target.value })
                                }
                                className="pokedex-field"
                            >
                                {GENERATION_CHOICES.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        style={{ backgroundColor: '#103552', color: '#ecfaff' }}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() =>
                                    updateFilters({
                                        implemented:
                                            filters.implemented === true ? undefined : true,
                                    })
                                }
                                className={
                                    filters.implemented === true
                                        ? 'pokedex-toggle pokedex-toggle-active'
                                        : 'pokedex-toggle'
                                }
                            >
                                Only active
                            </button>
                        </div>

                        {isLoading && (
                            <div className="flex min-h-[460px] items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div
                                        className="mx-auto h-12 w-12 rounded-full border-2 border-t-transparent animate-spin"
                                        style={{
                                            borderColor: 'rgba(120,214,255,0.44)',
                                            borderTopColor: 'transparent',
                                        }}
                                    />
                                    <p
                                        className="text-xs font-semibold uppercase tracking-[0.24em]"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        Loading entries
                                    </p>
                                </div>
                            </div>
                        )}

                        {isError && (
                            <div className="flex min-h-[460px] items-center justify-center">
                                <div className="text-center">
                                    <p className="text-xl font-semibold text-white">
                                        Unable to load Pokedex data
                                    </p>
                                    <p
                                        className="mt-2 text-sm"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        Check the API connection and try again.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!isLoading && !isError && entries.length === 0 && (
                            <div className="flex min-h-[460px] items-center justify-center">
                                <div className="text-center">
                                    <p className="text-xl font-semibold text-white">
                                        No matching entries
                                    </p>
                                    <p
                                        className="mt-2 text-sm"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        Change the current filters to show more Pokemon.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!isLoading && !isError && entries.length > 0 && (
                            <>
                                <div className="mt-4 grid grid-cols-8 gap-3 max-[1084px]:grid-cols-5 max-[680px]:grid-cols-4 xl:grid-cols-5">
                                    {sortedEntries.map((pokemon) => {
                                        const isActive = activePokemon?.slug === pokemon.slug;

                                        return (
                                            <button
                                                key={pokemon.id}
                                                type="button"
                                                onClick={() => setActiveSlug(pokemon.slug)}
                                                onMouseEnter={() => setActiveSlug(pokemon.slug)}
                                                onFocus={() => setActiveSlug(pokemon.slug)}
                                                className={
                                                    isActive
                                                        ? 'pokedex-grid-tile pokedex-grid-tile-active'
                                                        : 'pokedex-grid-tile'
                                                }
                                            >
                                                <span className="pokedex-grid-number">
                                                    #{formatDexNumber(pokemon.nationalDexNumber)}
                                                </span>

                                                <div className="flex flex-1 items-center justify-center">
                                                    {pokemon.implemented ? (
                                                        <Image
                                                            src={spriteSrc(pokemon)}
                                                            alt={pokemon.displayName}
                                                            width={80}
                                                            height={80}
                                                            unoptimized
                                                            className="max-h-[80px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
                                                        />
                                                    ) : (
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl font-black text-white/25">
                                                            ?
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-auto flex items-center justify-between gap-2">
                                                    <span
                                                        className="truncate text-[10px] font-semibold uppercase tracking-[0.08em]"
                                                        style={{ color: 'var(--color-text-secondary)' }}
                                                    >
                                                        {pokemon.implemented ? 'Ready' : 'Empty'}
                                                    </span>

                                                    <span
                                                        className={
                                                            pokemon.implemented
                                                                ? 'pokedex-grid-status pokedex-grid-status-active'
                                                                : 'pokedex-grid-status'
                                                        }
                                                    />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateFilters({
                                                page: Math.max((data?.number ?? 0) - 1, 0),
                                            })
                                        }
                                        disabled={data?.first}
                                        className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-35"
                                        style={{
                                            borderColor: 'var(--color-border)',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            color: 'var(--color-text-primary)',
                                        }}
                                    >
                                        Previous
                                    </button>

                                    <div
                                        className="text-xs font-semibold uppercase tracking-[0.22em]"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        Page {(data?.number ?? 0) + 1} / {Math.max(data?.totalPages ?? 1, 1)}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateFilters({
                                                page: Math.min(
                                                    (data?.number ?? 0) + 1,
                                                    Math.max((data?.totalPages ?? 1) - 1, 0)
                                                ),
                                            })
                                        }
                                        disabled={data?.last}
                                        className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-35"
                                        style={{
                                            borderColor: 'var(--color-border)',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            color: 'var(--color-text-primary)',
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function PokedexPage() {
    return (
        <Suspense>
            <PokedexContent />
        </Suspense>
    );
}

function spriteSrc(pokemon: PokemonListItem): string {
    return (
        pokemon.spriteUrl ??
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.nationalDexNumber}.png`
    );
}
function imageSrc(pokemon: PokemonListItem): string {
    return (
        pokemon.imageUrl ??
        pokemon.spriteUrl ??
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.nationalDexNumber}.png`
    );
}

function formatDexNumber(value: number): string {
    return String(value).padStart(value >= 1000 ? 4 : 3, '0');
}

function padCounter(value: number): string {
    return String(value).padStart(3, '0');
}

function formatGeneration(code: string): string {
    const match = code.match(/\d+/);
    return match ? `GEN ${match[0]}` : code.toUpperCase();
}
