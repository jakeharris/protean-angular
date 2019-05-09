import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PokemonType, isPokemonType } from 'src/app/models/pokemon-type';
import { tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-type-input',
  template: `
    <input
      type="text"
      autofocus
      placeholder="Protean"
      [attr.class]="colorType"
      [formControl]="input"
    />
  `,
  styles: [
    `
      input {
        width: 100%;
        height: 150px;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        font-size: 48px;
        text-align: center;
      }
    `
  ]
})
export class TypeInputComponent implements OnInit {
  input = new FormControl();
  typeElementValue$ = new BehaviorSubject<string>('');

  @Input() colorType: PokemonType;
  @Output() selectType = new EventEmitter<PokemonType>();

  ngOnInit() {
    this.input.valueChanges
      .pipe(
        map(partialType => partialType.toLowerCase()),
        filter(partialType => isPokemonType(partialType)),
        tap((selectedType: PokemonType) => this.selectType.emit(selectedType)),
        tap(_ => this.input.setValue(''))
      )
      .subscribe();
  }
}
