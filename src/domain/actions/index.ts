import { State } from 'domain/state/definition';

import _ from 'lodash';
import { Subject }  from 'rxjs';
import { updateList, updateDetail } from 'domain/actions/pokemon';
import { updatePage } from 'domain/actions/page';

function createAction(reducer: (State, Any?) => State | Promise<State>) {
  return new Subject().map(payload => _.partialRight(reducer, payload));
}

const getPokemonDetailAction$ = createAction(updateList);
const getPokemonListAction$ = createAction(updateDetail);
const updateCurrentPage$ = createAction(updatePage);

const actions = [
  getPokemonDetailAction$,
  getPokemonListAction$,
  updateCurrentPage$
];

export function actionStream() {
  return new Subject().merge(...actions);
}

export function getPokemonDetail(name: string): void {
  getPokemonDetailAction$.next(name);
} 

export function getPokemonList(): void {
  getPokemonListAction$.next();
}

export function updateCurrentPage(name: string): void {
  updateCurrentPage$.next(name);  
}