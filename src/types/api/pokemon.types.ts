export interface PokemonListItem {
    id: number;
    slug: string;
    displayName: string;
    nationalDexNumber: number;
    generationCode: string;
    implemented: boolean;
    spriteUrl: string | null;
}

export interface PokemonForm {
    id: number;
    code: string;
    displayName: string;
    isDefault: boolean;
    battleOnly: boolean;
    primaryType: string;
    secondaryType: string | null;
    baseHp: number;
    baseAttack: number;
    baseDefense: number;
    baseSpecialAttack: number;
    baseSpecialDefense: number;
    baseSpeed: number;
    imageUrl: string | null;
    drops: PokemonDropItem[];
}

export interface PokemonDropItem {
    id: number;
    itemNamespacedId: string;
    itemDisplayName: string;
    itemIsPlaceholder: boolean;
    quantityMin: number | null;
    quantityMax: number | null;
    percentage: number;
    dropPoolAmountMin: number | null;
    dropPoolAmountMax: number | null;
}

export interface PokemonDetails extends PokemonListItem {
    spriteUrl: string | null;
    iconUrl: string | null;
    imageUrl: string | null;
    forms: PokemonForm[];
}

export interface PokemonSearchParams {
    search?: string;
    generationCode?: string;
    implemented?: boolean;
    page?: number;
    size?: number;
}