import _ from 'lodash';
import { Observable, Subject, ReplaySubject, from, of, range, pipe, asyncScheduler, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { scan, publishReplay, refCount } from 'rxjs/operators';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state');

export function createState(reducer$, initialState = {}) {
  logger.debug('Create state');
  const source$ = of(initialState);
  const merged$ = merge(source$, reducer$);
  merged$.pipe(
    scan((state, reducer: Function) => {
      logger.debug('Scan stream');
      return reducer(state)
    }, initialState),
    publishReplay(1)
  );

  return source$;
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