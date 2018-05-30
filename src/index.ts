import { render } from 'renderer';
import { getLogger } from 'utils/logger';
import startRouters from 'domain/router';

const logger = getLogger('index');

logger.debug('Start render');
render();

logger.debug('Start router');
startRouters();
