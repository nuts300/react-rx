import _ from 'lodash';
import { BehaviorSubject, Observable, Scheduler, of, merge, Subscriber }  from 'rxjs';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/observable');

function createState(reducer$, initialState = {}) {
  return of(initialState)
    .merge(reducer$)
    .scan((state, reducer) => reducer(state))
    .publishReplay(1)
    .refCount();
}
