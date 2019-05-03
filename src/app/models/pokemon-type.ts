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
