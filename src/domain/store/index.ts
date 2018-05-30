import reduce from 'lodash/reduce';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';
import { initialDetail, initialPage, initialAllItems } from 'domain/store/state';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/state');

class Stream<T> {
  source$: Observable<T>
  action$: Subject<(T) => T>
  constructor(source: T) {
    this.action$ = new BehaviorSubject(state => state);
    const state$ = new BehaviorSubject(source);
    this.source$ = state$.pipe(
      combineLatest(this.action$),
      map(([source, reducer]) => {
        logger.debug('Map!', source, reducer);
        return reducer(source);
      })
    );
  }

  dispatch(reducer: (state: T) => T): void {
    this.action$.next(reducer);
  }
}

export const store = {
  pokemonDetail: new Stream(initialDetail),
  pokemonList: new Stream(initialAllItems),
  currentPage: new Stream(initialPage)
}
