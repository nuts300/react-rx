import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getLogger } from 'utils/logger';
import App from 'components/container/app';

const logger = getLogger('renderer');

export function render() {
  logger.debug('Rendering...');
  logger.time('DOM Render');
  ReactDOM.render(App, document.getElementById('app'));
  logger.timeEnd('DOM Rendered');
  logger.debug('Rendered...');
}
