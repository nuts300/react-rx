import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { connect } from 'domain/store/connecter';
import { getLogger } from 'utils/logger';
import App from 'components/container/app';

const logger = getLogger('renderer');

export function render() {
  logger.time('DOM Render');
  ReactDOM.render(connect(App), document.getElementById('app'));
  logger.timeEnd('DOM Rendered');
}
