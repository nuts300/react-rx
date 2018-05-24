import { State } from 'domain/state/definition';

import _ from 'lodash';
import { Subject, Observable, Observer, of, merge }  from 'rxjs';
import { map } from 'rxjs/operators';
import { updateList, updateDetail } from 'domain/actions/pokemon';
import { updatePage } from 'domain/actions/page';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/actions');

const getPokemonDetailAction$ = new Subject();
const getPokemonListAction$ = new Subject();
const updateCurrentPageAction$ = new Subject();

function createAction(subject$, func) {
  logger.debug('Create action');
  return subject$.pipe(map(payload => {
    logger.debug('Action map', payload);
    return _.partialRight(func, payload)
  }));
}

export function actionStream(): Observable<any> {
  logger.debug('Merge actions');
  return  merge(
    createAction(getPokemonDetailAction$, updateDetail),
    createAction(getPokemonListAction$, updateList),
    createAction(updateCurrentPageAction$, updatePage)
  );
}

export function getPokemonDetail(name: string): void {
  logger.debug('getPokemonDetail', name);
  getPokemonDetailAction$.next(name);
} 

export function getPokemonList(): void {
  logger.debug('getPokemonList');
  getPokemonListAction$.next('go!!');
}

export function updateCurrentPage(name: string): void {
  logger.debug('updateCurrentPage', name);
  updateCurrentPageAction$.next(name);  
}