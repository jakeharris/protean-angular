import { Component, Input } from '@angular/core';
import {
  PokemonType,
  PokemonTypeDefensiveEffectiveness
} from 'src/app/models/pokemon-type';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-defensive-effectiveness-remarks',
  template: `
    <section
      class="double-weaknesses"
      *ngIf="doubleWeaknesses && doubleWeaknesses.length > 0"
    >
      <h2>{{ doubleWeaknesses[0].multiplier }}x</h2>
      <ul>
        <li
          *ngFor="let doubleWeakness of doubleWeaknesses"
          [attr.class]="'type-card ' + doubleWeakness.type"
        >
          {{ doubleWeakness.type }}
        </li>
      </ul>
    </section>
    <section class="weaknesses" *ngIf="weaknesses && weaknesses.length > 0">
      <h2>{{ weaknesses[0].multiplier }}x</h2>
      <ul>
        <li
          *ngFor="let weakness of weaknesses"
          [attr.class]="'type-card ' + weakness.type"
        >
          {{ weakness.type }}
        </li>
      </ul>
    </section>
    <section class="resistances" *ngIf="resistances && resistances.length > 0">
      <h2>{{ resistances[0].multiplier }}x</h2>
      <ul>
        <li
          *ngFor="let resistance of resistances"
          [attr.class]="'type-card ' + resistance.type"
        >
          {{ resistance.type }}
        </li>
      </ul>
    </section>
    <section
      class="double-resistances"
      *ngIf="doubleResistances && doubleResistances.length > 0"
    >
      <h2>{{ doubleResistances[0].multiplier }}x</h2>
      <ul>
        <li
          *ngFor="let doubleResistance of doubleResistances"
          [attr.class]="'type-card ' + doubleResistance.type"
        >
          {{ doubleResistance.type }}
        </li>
      </ul>
    </section>
    <section class="immunities" *ngIf="immunities && immunities.length > 0">
      <h2>{{ immunities[0].multiplier }}x</h2>
      <ul>
        <li
          *ngFor="let immunity of immunities"
          [attr.class]="'type-card ' + immunity.type"
        >
          {{ immunity.type }}
        </li>
      </ul>
    </section>
    <p
      *ngIf="
        !(immunities && immunities.length > 0) &&
        !(weaknesses && weaknesses.length > 0) &&
        !(doubleWeaknesses && doubleWeaknesses.length > 0) &&
        !(resistances && resistances.length > 0) &&
        !(doubleResistances && doubleResistances.length > 0)
      "
      class="empty"
    >
      Type some Pokemon types!
    </p>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
        padding: 0 48px;
        flex-wrap: wrap;
      }
      section {
        flex-basis: 33%;
        width: 33%;
        padding: 0 16px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        -webkit-padding-start: 0;
        padding: 0;

        list-style-type: none;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0;
      }
      .type-card {
        flex-basis: 50%;
        width: 50%;
        padding: 1rem;
        text-align: center;
        font-size: 1.5rem;
        list-style: none;
        text-transform: capitalize;
      }
      .empty {
        font-size: 3rem;
        text-align: center;
        width: 100%;
        margin-top: 0;
      }
    `
  ]
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
