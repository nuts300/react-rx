import { State } from 'domain/state/definition';

import _ from 'lodash';
import { Subject, Observable, of }  from 'rxjs';
import { map, merge } from 'rxjs/operators';
import { updateList, updateDetail } from 'domain/actions/pokemon';
import { updatePage } from 'domain/actions/page';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/actions');

const getPokemonDetailAction$ = new Subject();
const getPokemonListAction$ = new Subject();
const updateCurrentPageAction$ = new Subject();

const actions = [
  getPokemonDetailAction$,
  getPokemonListAction$,
  updateCurrentPageAction$
];

export function actionStream(initialState) {
  logger.debug('Merge actions');
  getPokemonListAction$.pipe(
    map(x => {
      logger.debug('getPokemonListAction map', x);
      return x;
    }));
  return getPokemonListAction$.subscribe({
    next: message => {
      logger.debug('getPokemonListAction', message);
      return message;
    }
  });

  // return of(initialState)
  //   .pipe(merge(
  //     getPokemonDetailAction$.pipe(map(name => {
  //       logger.debug('getPokemonDetailAction', name);
  //       _.partialRight(updateDetail, name)
  //     })),
  //     getPokemonListAction$.pipe(map(() => {
  //       logger.debug('getPokemonListAction', name);
  //       return updateList
  //     })),
  //     updateCurrentPageAction$.pipe(map(name => {
  //       logger.debug('updateCurrentPageAction', name);
  //       return _.partialRight(updatePage, name)
  //     }))
  //   ));
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