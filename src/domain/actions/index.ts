import _ from 'lodash';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { Item, DetailItem, State, DetailItemFromNetwork, PageName } from 'domain/store/state';
import { store } from 'domain/store';
import { getList, getDetailByName } from 'domain/network';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/actions');

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
  store.pokemonDetail.dispatch(state => detail);
}

export async function updatePokemonList(): Promise<void> {
  const list = await getList();
  logger.debug('updatePokemonList', list);
  store.pokemonList.dispatch(state => list);
}

export function updateCurrentPage(name: PageName): void {
  logger.debug('updateCurrentPage', name);
  const page = { name };
  store.currentPage.dispatch(state => page);
}