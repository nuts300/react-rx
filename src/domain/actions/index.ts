import { State } from 'domain/state/definition';

import _ from 'lodash';
import { Subject, Observable, of }  from 'rxjs';
import { map, merge } from 'rxjs/operators';
import { updateList, updateDetail } from 'domain/actions/pokemon';
import { updatePage } from 'domain/actions/page';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/actions');

function createAction(reducer: (State, Any?) => State | Promise<State>) {
  const subject$ = new Subject();
  subject$.pipe(map(payload => _.partialRight(reducer, payload)));
  return subject$;
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
  logger.debug('Merge actions');
  return merge(...actions);
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