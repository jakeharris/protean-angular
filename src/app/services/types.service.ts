import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonTypeDefensiveEffectiveness } from '../models/pokemon-type';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + 'assets/types.json';

@Injectable()
export class TypesService {
  constructor(private http: HttpClient) {}

  getDefensiveEffectivenesses(): Observable<
    PokemonTypeDefensiveEffectiveness[]
  > {
    return this.http.get<PokemonTypeDefensiveEffectiveness[]>(url);
  }
}