import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type';

@Component({
  selector: 'app-selected-types',
  template: `
    <div *ngFor="let type of types" [attr.class]="'type-button ' + type">
      <span class="remove" (click)="deselectType.emit(type)">x</span>
      {{ type }}
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding-top: 3rem;
      }
      .type-button {
        padding: 1.5rem;
        margin: 0 1.5em;
        font-size: 1.5rem;
        flex-basis: 25%;
        text-transform: capitalize;
        text-align: center;
        position: relative;
      }
      .type-button .remove {
        font-size: 1rem;
        font-family: sans-serif;
        text-align: center;
        cursor: pointer;
        padding: 10px 12px;
        position: absolute;
        top: 0;
        right: 0;
      }
      .type-button .remove:hover {
        background: white;
      }
    `
  ]
})
export class SelectedTypesComponent {
  @Input() types: PokemonType[];

  @Output() deselectType = new EventEmitter<PokemonType>();
}
