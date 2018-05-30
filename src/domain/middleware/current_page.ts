import { store } from 'domain/store';
import { PageName } from 'domain/store/state';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/middleware/current_page');

export function updateCurrentPage(name: PageName): void {
  logger.debug('updateCurrentPage', name);
  const page = { name };
  store.currentPage.dispatch(state => page);
}
