import _ from 'lodash';
import { Subject }  from 'rxjs';
import { getPokemonList, getPokemonDetailByName } from 'domain/middleware/network';

function createAction(reducer) {
  return new Subject().map(payload => _.partialRight(reducer, payload));
}

export const getPokemonDetailAction$ = createAction(getPokemonList);
export const getPokemonListAction$ = createAction(getPokemonDetailByName);

export const actions = [
  getPokemonDetailAction$,
  getPokemonListAction$
];
