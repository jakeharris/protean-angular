import { Component } from '@angular/core';
import { BehaviorSubject, merge } from 'rxjs';
import { scan, debounceTime, map } from 'rxjs/operators';
import { PokemonType } from './models/pokemon-type';
import { TypesService } from './services/types.service';

@Component({
  selector: 'app-root',
  template: `
    <app-type-input (selectType)="typeSelected$.next($event)"></app-type-input>
    <app-selected-types
      [types]="selectedTypes$ | async"
      (deselectType)="typeDeselected$.next($event)"
    ></app-selected-types>
    <app-defensive-effectiveness-remarks
      [types]="selectedTypes$ | async"
    ></app-defensive-effectiveness-remarks>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'protean';
  secondTypeTimeout = 2000;

  constructor(private typesService: TypesService) {}

  // UI OUTPUT
  typeSelected$ = new BehaviorSubject<PokemonType>(null);
  typeDeselected$ = new BehaviorSubject<PokemonType>(null);

  // INTERMEDIARIES
  typeSelectionTimedOut$ = this.typeSelected$.pipe(
    debounceTime(this.secondTypeTimeout),
    map(type => null)
  );

  // UI INPUT
  selectedTypes$ = merge(this.typeSelected$, this.typeSelectionTimedOut$).pipe(
    scan((types, type) => (type ? [...types, type] : []), [] as PokemonType[])
  );
  defensiveEffectivenesses$ = this.typesService.getDefensiveEffectivenesses();
}
