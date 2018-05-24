import { getLogger } from 'utils/logger';
import { State, Page, Item, DetailItem } from 'domain/state/definition';

const logger = getLogger('domain/state/reducer');

export function updateCurrentpage(state: State, currentPage: Page): State {
  logger.debug('Reduce updateCurrentpage', currentPage);
  return {...state, currentPage };
}

export function updatePokemonList(state: State, allItems: Array<Item>): State {
  logger.debug('Reduce getPokemonList', allItems);
  return {...state, allItems };
}

export function updatePokemondetail(state: State, detail: DetailItem): State {
  logger.debug('REduce getPokemonList', state, detail);
  return {...state, detail };
}
