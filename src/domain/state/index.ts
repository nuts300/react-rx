import _ from 'lodash';
import { Scheduler, of }  from 'rxjs';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/observable');

export function createState(reducer$, initialState = {}) {
  return of(initialState)
    .merge(reducer$)
    .scan((state, reducer) => reducer(state))
    .publishReplay(1)
    .refCount();
}

export function subscribe(source$, render) {
  return source$
    .subscribe(render)
    .observeOn(Scheduler.async);
}