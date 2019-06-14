import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonTypeDefensiveEffectiveness } from '../models/pokemon-type';

const url = 'assets/types.json';

@Injectable()
export class TypesService {
  constructor(private http: HttpClient) {}

  getDefensiveEffectivenesses(): Observable<
    PokemonTypeDefensiveEffectiveness[]
  > {
    return this.http.get<PokemonTypeDefensiveEffectiveness[]>(url);
  }
}
