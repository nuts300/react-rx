import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getLogger } from 'utils/logger';
import App from 'components/container/app';

const logger = getLogger('Renderer');

export default function render() {
  logger.time('DOM Render');
  ReactDOM.render(<App />, document.getElementById('app'));
  logger.timeEnd('DOM Rendered');
}
