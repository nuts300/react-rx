import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

import { Item, DetailItem, State, DetailItemFromNetwork } from 'domain/store/state';
import { store } from 'domain/store';
import { getList, getDetailByName } from 'domain/network';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/actions');

function dispatchAction<T>(subject$: BehaviorSubject<T>, data: T) {
  subject$.next(data);
}

function camelCaseImageFront(detail: DetailItemFromNetwork): DetailItem {
  return {
    ...detail,
    sprites: {
      frontDefault: detail.sprites.front_default
    }
  };
}

export async function updatePokemonDetail(name: string): Promise<void> {
  const detail = await getDetailByName(name).then(camelCaseImageFront)
  logger.debug('updatePokemonDetail', detail);
  dispatchAction(store.pokemonDetail$, detail);
}

export async function updatePokemonList(): Promise<void> {
  const list = await getList();
  logger.debug('updatePokemonList', list);
  dispatchAction(store.pokemonList$, list);
}

export function updateCurrentPage(name: string): void {
  logger.debug('updateCurrentPage', name);
  dispatchAction(store.currentPage$, { name });
}