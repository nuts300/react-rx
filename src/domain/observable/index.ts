import { BehaviorSubject, Observable, Scheduler, of, merge, Subscriber }  from 'rxjs';
import { initialState } from 'domain/observable/state';

const source$ = new BehaviorSubject(initialState);
const handlers$ = of({
  handleChange: value => source$.next(value)
});

const merged$ = merge(
  source$.scan((prev, current) => {
    console.log('prev', prev);
    console.log('current', current);
    return current;
  }),
  handlers$
);

function render(state) {
  merged$.of(state);
}