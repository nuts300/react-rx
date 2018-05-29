import reduce from 'lodash/reduce';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';
import { initialDetail, initialPage } from 'domain/store/state';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/state');

class Store<T> {
  source$: Observable<T>
  action$: Subject<(T) => T>
  constructor(source: T) {
    this.action$ = new BehaviorSubject(state => state);
    this.source$ = this.action$.pipe(
      combineLatest(new BehaviorSubject(source)),
      map(([reducer, source]) => {
        logger.debug('Map!', source, reducer);
        return reducer(source);
      })
    );
  }

  dispatch(reducer: (T) => T): void {
    this.action$.next(reducer);
  }
}

export const store = {
  pokemonDetail: new Store(initialDetail),
  pokemonList: new Store([]),
  currentPage: new Store(initialPage)
}
