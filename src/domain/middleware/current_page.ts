import { store } from 'domain/store';
import { PageName } from 'domain/store/state';
import { updatePage } from 'domain/store/reducers/current_page';

import { getLogger } from 'utils/logger';

const logger = getLogger('domain/actions');

export function updateCurrentPage(name: PageName): void {
  logger.debug('updateCurrentPage', name);
  const page = { name };
  store.currentPage.dispatch(state => updatePage(state, page));
}
