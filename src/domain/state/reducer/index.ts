import { getLogger } from 'utils/logger';
import { State, Page, Item, DetailItem } from 'domain/state/definition';

const logger = getLogger('domain/state/reducer/network');

export function updateCurrentpage(state: State, currentPage: Page): State {
  logger.debug('start updateCurrentpage', currentPage);
  return {...state, currentPage };
}

export function updatePokemonList(state: State, allItems: Array<Item>): State {
  logger.debug('start getPokemonList', allItems);
  return {...state, allItems };
}

export function updatePokemondetail(state: State, detail: DetailItem): State {
  logger.debug('start getPokemonList', state, detail);
  return {...state, detail };
}
