export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ground'
  | 'rock'
  | 'ice'
  | 'steel'
  | 'fighting'
  | 'psychic'
  | 'dark'
  | 'ghost'
  | 'fairy'
  | 'dragon'
  | 'flying'
  | 'poison'
  | 'bug';

export interface PokemonTypeDefensiveEffectiveness {
  type: PokemonType;
  weaknesses: PokemonType[];
  resistances: PokemonType[];
  immunities: PokemonType[];
}

export function isPokemonType(typeName: string): typeName is PokemonType {
  return (
    typeName === 'normal' ||
    typeName === 'fire' ||
    typeName === 'water' ||
    typeName === 'grass' ||
    typeName === 'electric' ||
    typeName === 'ground' ||
    typeName === 'rock' ||
    typeName === 'ice' ||
    typeName === 'steel' ||
    typeName === 'fighting' ||
    typeName === 'psychic' ||
    typeName === 'dark' ||
    typeName === 'ghost' ||
    typeName === 'fairy' ||
    typeName === 'dragon' ||
    typeName === 'flying' ||
    typeName === 'poison' ||
    typeName === 'bug'
  );
}
