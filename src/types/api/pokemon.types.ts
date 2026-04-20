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
}

export interface PokemonDetails extends PokemonListItem {
    spriteUrl: string | null;
    iconUrl: string | null;
    forms: PokemonForm[];
}

export interface PokemonSearchParams {
    search?: string;
    generationCode?: string;
    implemented?: boolean;
    page?: number;
    size?: number;
}