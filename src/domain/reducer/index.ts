import _ from 'lodash';
import { Subject }  from 'rxjs';
import { actions } from 'domain/actions';

export function handleReducer() {
  return new Subject().merge(...actions);
}
