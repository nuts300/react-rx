import { store } from 'domain/store';
import { render } from 'renderer';
import { getLogger } from 'utils/logger';
import startRouters from 'domain/middleware/router';

const logger = getLogger('index');

render();
startRouters();
