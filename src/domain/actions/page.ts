import { getLogger } from 'utils/logger';
import { State, PageName, Page } from 'domain/state/definition';
import { updateCurrentpage } from 'domain/state/reducer/index';
import { getList, getDetailByName } from 'domain/middleware/network';

const logger = getLogger('domain/actions/page');

export function updatePage(state: State, name: PageName): State {
  logger.debug('updatePage');
  const page: Page = { name };
  return updateCurrentpage(state, { name });
}