import { Component, Input } from '@angular/core';
import {
  PokemonType,
  PokemonTypeDefensiveEffectiveness
} from 'src/app/models/pokemon-type';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-defensive-effectiveness-remarks',
  template: `
    <pre>{{ weaknesses | json }}</pre>
    <pre>{{ resistances | json }}</pre>
    <pre>{{ immunities | json }}</pre>
  `,
  styles: [``]
})
export class DefensiveEffectivenessRemarksComponent {
  doubleWeaknesses: EffectivenessMultiplier[];
  weaknesses: EffectivenessMultiplier[];
  resistances: EffectivenessMultiplier[];
  doubleResistances: EffectivenessMultiplier[];
  immunities: EffectivenessMultiplier[];

  _types: PokemonType[];
  _defensiveEffectivenesses: PokemonTypeDefensiveEffectiveness[];

  @Input() set types(types: PokemonType[]) {
    this._types = types;
    this.setDefensiveEffectivenessByMultiplier();
  }
  @Input() set defensiveEffectivenesses(
    defensiveEffectivenesses: PokemonTypeDefensiveEffectiveness[]
  ) {
    this._defensiveEffectivenesses = defensiveEffectivenesses;
    this.setDefensiveEffectivenessByMultiplier();
  }

  private setDefensiveEffectivenessByMultiplier() {
    if (!this._defensiveEffectivenesses || !this._types) return;

    const effectivenesses = this._defensiveEffectivenesses
      .filter(effectiveness => this._types.indexOf(effectiveness.type) !== -1)
      .reduce(byFlatteningEffectivenesses, [] as EffectivenessMultiplier[])
      .reduce(byResolvingMultityping, [] as EffectivenessMultiplier[]);

    this.immunities = effectivenesses.filter(e => e.multiplier === 0);
    this.doubleResistances = effectivenesses.filter(e => e.multiplier === 0.25);
    this.resistances = effectivenesses.filter(e => e.multiplier === 0.5);
    this.weaknesses = effectivenesses.filter(e => e.multiplier === 2);
    this.doubleWeaknesses = effectivenesses.filter(e => e.multiplier === 4);
  }

  constructor(private typesServices: TypesService) {}
}

interface EffectivenessMultiplier {
  type: PokemonType;
  multiplier: number;
}

function byFlatteningEffectivenesses(
  unfilteredEffectivenesses: EffectivenessMultiplier[],
  { weaknesses, immunities, resistances }: PokemonTypeDefensiveEffectiveness
) {
  return [
    ...unfilteredEffectivenesses,
    ...weaknesses.map(weakness => ({ type: weakness, multiplier: 2 })),
    ...resistances.map(resistance => ({
      type: resistance,
      multiplier: 0.5
    })),
    ...immunities.map(immunity => ({ type: immunity, multiplier: 0 }))
  ];
}

function byResolvingMultityping(filteredEffectivenesses, effectiveness) {
  const duplicateEffectiveness = filteredEffectivenesses.find(
    e => e.type === effectiveness.type
  );
  if (duplicateEffectiveness) {
    duplicateEffectiveness.multiplier *= effectiveness.multiplier;
    return filteredEffectivenesses;
  } else {
    return [...filteredEffectivenesses, effectiveness];
  }
}
