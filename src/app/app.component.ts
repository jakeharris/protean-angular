import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, merge, Subject, Subscription } from 'rxjs';
import {
  scan,
  debounceTime,
  map,
  startWith,
  mapTo,
  pluck,
  tap,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import {
  PokemonType,
  getRandomPokemonType,
  isPokemonType
} from './models/pokemon-type';
import { TypesService } from './services/types.service';

@Component({
  selector: 'app-root',
  template: `
    <app-type-input
      [colorType]="mostRecentlySelectedTypeOrRandomType$ | async"
      (selectType)="typeSelected$.next($event)"
    ></app-type-input>
    <app-selected-types
      [types]="selectedTypes$ | async"
      (deselectType)="typeDeselected$.next($event)"
    ></app-selected-types>
    <app-defensive-effectiveness-remarks
      [types]="selectedTypes$ | async"
      [defensiveEffectivenesses]="defensiveEffectivenesses$ | async"
    ></app-defensive-effectiveness-remarks>
  `,
  styles: [``]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'protean';
  secondTypeTimeout = 5000;
  maximumLength = 2;
  initialState: ProteanState = {
    types: [],
    shouldReset: false
  };

  constructor(private typesService: TypesService) {}

  // UI OUTPUT
  typeSelected$ = new Subject<PokemonType>();
  typeDeselected$ = new Subject<PokemonType>();

  // INTERMEDIARIES
  typeSelectionTimedOut$ = merge(this.typeSelected$, this.typeDeselected$).pipe(
    debounceTime(this.secondTypeTimeout),
    map(_ => null)
  );

  // ACTIONS
  dispatcher$ = new Subject<ProteanActionTypeUnion>();
  actions$ = merge(
    this.typeSelectionTimedOut$.pipe(
      mapTo<null, FlagForResetAction>({ type: ProteanActionTypes.FlagForReset })
    ),
    this.typeDeselected$.pipe(
      map(
        (deselectedType): DeselectAction => ({
          type: ProteanActionTypes.Deselect,
          deselectedType
        })
      )
    ),
    this.dispatcher$.asObservable()
  );
  // STATE
  state$ = this.actions$.pipe(
    startWith(this.initialState),
    scan((state: ProteanState, action: ProteanActionTypeUnion) => {
      switch (action.type) {
        case ProteanActionTypes.Select:
          return {
            ...state,
            types: [...state.types, action.selectedType]
          };
        case ProteanActionTypes.Deselect:
          return {
            ...state,
            types: state.types.filter(type => type !== action.deselectedType),
            shouldReset: false
          };
        case ProteanActionTypes.FlagForReset:
          return {
            ...state,
            shouldReset: true
          };
        case ProteanActionTypes.Reset:
          if (state.shouldReset) {
            return this.initialState;
          } else return state;
        default:
          return state;
      }
    })
  );
  // UI INPUT
  defensiveEffectivenesses$ = this.typesService.getDefensiveEffectivenesses();
  selectedTypes$ = this.state$.pipe(
    pluck<ProteanState, PokemonType[]>('types')
  );
  flaggedForReset$ = this.state$.pipe(
    pluck<ProteanState, boolean>('shouldReset')
  );

  subscriptions: Subscription[];

  typeSelectedAndDeduped$ = this.typeSelected$.pipe(
    tap(_ => this.dispatcher$.next({ type: ProteanActionTypes.Reset })),
    withLatestFrom(this.selectedTypes$),
    filter(
      ([selectedType, selectedTypes]) =>
        selectedTypes.indexOf(selectedType) === -1
    ),
    tap(([selectedType, selectedTypes]) => {
        // if adding this one will max it out...
        if (selectedTypes.length + 1 >= this.maximumLength) {
          this.dispatcher$.next({ type: ProteanActionTypes.FlagForReset });
        }
        this.dispatcher$.next({
          type: ProteanActionTypes.Select,
          selectedType
        });
    })
  );
  mostRecentlySelectedTypeOrRandomType$ = this.typeSelected$.pipe(
    startWith(getRandomPokemonType()),
    filter(type => isPokemonType(type))
  );

  ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(this.typeSelectedAndDeduped$.subscribe());
  }
  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}

// Basically, rewrite ngRx
interface ProteanState {
  types: PokemonType[];
  shouldReset: boolean;
}
interface Action {
  type: string;
}
interface SelectAction extends Action {
  readonly type: ProteanActionTypes.Select;
  selectedType: PokemonType;
}
interface DeselectAction extends Action {
  readonly type: ProteanActionTypes.Deselect;
  deselectedType: PokemonType;
}
interface FlagForResetAction extends Action {
  readonly type: ProteanActionTypes.FlagForReset;
}
interface ResetAction extends Action {
  readonly type: ProteanActionTypes.Reset;
}

type ProteanActionTypeUnion =
  | SelectAction
  | DeselectAction
  | FlagForResetAction
  | ResetAction;
enum ProteanActionTypes {
  Select = '[Protean] Select type',
  Deselect = '[Protean] Deselect type',
  FlagForReset = '[Protean] Flag for reset',
  Reset = '[Protean] Reset types'
}
