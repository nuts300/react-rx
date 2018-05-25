import { getLogger } from 'utils/logger';
import { State, Item, DetailItem, DetailItemFromNetwork } from 'domain/state/definition';
import { getList, getDetailByName } from 'domain/middleware/network';

const logger = getLogger('domain/actions/pokemon');

export function updateList(state: State, allItems: Array<Item>): State {
  logger.debug('updateList');
  return { ...state, allItems };
}

export function updateDetail(state: State, detail: DetailItem): State {
  logger.debug('updateDetail');
  return { ...state, detail };
}