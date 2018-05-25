import { getLogger } from 'utils/logger';
import { State, PageName, Page } from 'domain/state/definition';
import { getList, getDetailByName } from 'domain/middleware/network';

const logger = getLogger('domain/actions/page');

export function updatePage(state: State, currentPage: Page): State {
  logger.debug('updatePage');;
  return { ...state, currentPage };
}