import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type';

@Component({
  selector: 'app-selected-types',
  template: `
    <div *ngFor="let type of types" [attr.class]="type">
      <span class="remove" (click)="deselectType.emit(type)">x</span>
      {{ type }}
    </div>
  `,
  styles: []
})
export class SelectedTypesComponent {
  @Input() types: PokemonType[];

  @Output() deselectType = new EventEmitter<PokemonType>();
}
