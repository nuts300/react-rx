import { createState, subscribe } from 'domain/state';
import { actionStream } from 'domain/actions';
import { initialState } from 'domain/state/definition';
import { render } from 'renderer';
import { getLogger } from 'utils/logger';

const logger = getLogger('index');

logger.debug('Create root stream');
const rootStream$ = createState(actionStream(), initialState);

logger.debug('Start subscriber');
const source$ = subscribe(rootStream$, render);
source$.next(initialState);
