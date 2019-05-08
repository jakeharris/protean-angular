import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonType, isPokemonType } from 'src/app/models/pokemon-type';
import { repeat, takeUntil, tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-type-input',
  template: `
    <input
      type="text"
      (input)="input$.next($event.target.value)"
      [value]="typeElementValue$ | async"
    />
  `,
  styles: [``]
})
export class TypeInputComponent implements OnInit {
  input$ = new BehaviorSubject<string>('');
  typeElementValue$ = new BehaviorSubject<string>('');

  @Output() selectType = new EventEmitter<PokemonType>();

  ngOnInit() {
    this.input$
      .pipe(
        map(partialType => partialType.toLowerCase()),
        filter(partialType => isPokemonType(partialType)),
        tap((selectedType: PokemonType) => this.selectType.emit(selectedType)),
        tap(_ => this.typeElementValue$.next(''))
      )
      .subscribe();
  }
}
