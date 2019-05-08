import { Component, Input } from '@angular/core';
import {
  PokemonType,
  PokemonTypeDefensiveEffectiveness
} from 'src/app/models/pokemon-type';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-defensive-effectiveness-remarks',
  template: `
    <div class="weaknesses"></div>
  `,
  styles: [``]
})
export class DefensiveEffectivenessRemarksComponent {
  doubleWeaknesses: PokemonType[];
  weaknesses: PokemonType[];
  resistances: PokemonType[];
  doubleResistances: PokemonType[];
  immunities: PokemonType[];

  @Input() types: PokemonType[];
  @Input() set defensiveEffectivenesses(
    effectivenesses: PokemonTypeDefensiveEffectiveness[]
  ) {
    const multipliers: EffectivenessMultiplier[] = effectivenesses
      .filter(effectiveness => effectiveness.type in this.types)
      .reduce(
        (unfilteredMultipliers, { weaknesses, immunities, resistances }) => [
          ...unfilteredMultipliers,
          ...weaknesses.map(weakness => toEffectivenessMultiplier(weakness, 2)),
          ...resistances.map(resistance =>
            toEffectivenessMultiplier(resistance, 0.5)
          ),
          ...immunities.map(immunity => toEffectivenessMultiplier(immunity, 0))
        ],
        []
      );
  }

  constructor(private typesServices: TypesService) {}
}

function toEffectivenessMultiplier(
  type: PokemonType,
  multiplier: number
): EffectivenessMultiplier {
  const effectivenessMultiplier = {} as EffectivenessMultiplier;
  effectivenessMultiplier[type] = multiplier;
  return effectivenessMultiplier;
}

type EffectivenessMultiplier =
  | { normal: number }
  | { fire: number }
  | { water: number }
  | { grass: number }
  | { electric: number }
  | { ground: number }
  | { rock: number }
  | { ice: number }
  | { steel: number }
  | { fighting: number }
  | { psychic: number }
  | { dark: number }
  | { ghost: number }
  | { fairy: number }
  | { dragon: number }
  | { flying: number }
  | { poison: number }
  | { bug: number };
