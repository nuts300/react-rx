import { Observable, Subject, ReplaySubject, from, of, range, pipe, asyncScheduler, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { scan, publishReplay, refCount } from 'rxjs/operators';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state');

export function createState(reducer$, initialState = {}): Observable<any> {
  logger.debug('Create state');

  return merge(of(initialState), reducer$)
    .pipe(
      map(x => {
        logger.debug('Watch merged stream', x);
        return x;
      }),
      scan((state, reducer: Function) => {
        logger.debug('Scan stream');
        logger.debug('Scan state', state);
        logger.debug('Scan reducer', reducer);
        return reducer(state);
      })
  );
}

export function subscribe(source$, render) {
  return source$
    .subscribe(state => {
      logger.debug('Subscribe state');
      window.setTimeout(function() {
        logger.debug('Render', state);
        render(state);
      }, 0)
    });
}