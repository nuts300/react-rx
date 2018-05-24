import { Observable, Subject, ReplaySubject, from, of, range, pipe, asyncScheduler } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { scan, publishReplay, refCount, merge } from 'rxjs/operators';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state');

export function createState(reducer$, initialState = {}) {
  logger.debug('Create state');
  const source$ = of(initialState).pipe(
    map(x => {
      logger.debug('Watch source stream', x);
      return x;
    }));
  // reducer$.pipe(
  //   map(x => {
  //     logger.debug('Watch reducer stream', x);
  //     return x;
  //   }));
  source$
    .pipe(
      // merge(reducer$),
      map(x => {
        logger.debug('Watch merged stream', x);
        return x;
      }),
      scan((state, reducer: Function) => {
        logger.debug('Scan stream');
        return reducer(state)
      })
  );

  return source$;
}

export function subscribe(source$, render) {
  return source$
    .subscribe(state => {
      logger.debug('Subscribe state');
      window.setTimeout(function() {
        logger.debug('Render state');
        render(state);
      }, 0)
    });
}