import { Item, DetailItem, State, DetailItemFromNetwork, PageName } from 'domain/store/state';
import { store } from 'domain/store';
import { getList, getDetailByName } from 'domain/network';
import { updatePokemon } from 'domain/store/reducers/pokemon_detail';
import { updateList } from 'domain/store/reducers/pokemon_list';

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
  store.pokemonDetail.dispatch(state => updatePokemon(state, detail));
}

export async function updatePokemonList(): Promise<void> {
  const list = await getList();
  logger.debug('updatePokemonList', list);
  store.pokemonList.dispatch(state => updateList(state, list));
}
