import { createState, subscribe } from 'domain/state';
import { actionStream } from 'domain/actions';
import { initialState } from 'domain/state/definition';
import { render } from 'renderer';

const rootStream$ = createState(actionStream, initialState);
subscribe(rootStream$, render);
