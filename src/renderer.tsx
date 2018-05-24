import { State } from 'domain/state/definition';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getLogger } from 'utils/logger';
import App from 'components/container/app';

const logger = getLogger('renderer');

export function render(state: State) {
  logger.time('DOM Render');
  ReactDOM.render(<App {...state} />, document.getElementById('app'));
  logger.timeEnd('DOM Rendered');
}
