import _ from 'lodash';
import { Observable, Subject, ReplaySubject, from, of, range, pipe, asyncScheduler } from 'rxjs';
import { map, filter, merge } from 'rxjs/operators';

import { scan, publishReplay, refCount } from 'rxjs/operators';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state');

export function createState(reducer$, initialState = {}) {
  logger.debug('Create state');
  const source$ = of(initialState);
  return source$.pipe(
    merge(reducer$),
    scan((state, reducer: Function) => reducer(state)),
    publishReplay(1)
  );
}

export function subscribe(source$, render) {
  return source$
    .subscribe(state => {
      logger.debug('Start subscriber');
      window.setTimeout(function() {
        logger.debug('Render state');
        render(state);
      }, 0)
    });
}