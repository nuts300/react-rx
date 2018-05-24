import { getLogger } from 'utils/logger';
import { State, Item, DetailItem, DetailItemFromNetwork } from 'domain/state/definition';
import { updatePokemonList, updatePokemondetail, updateCurrentpage } from 'domain/state/reducer/index';
import { getList, getDetailByName } from 'domain/middleware/network';

const logger = getLogger('domain/actions/pokemon');

function camelCaseImageFront(detail: DetailItemFromNetwork): DetailItem {
  return {
    ...detail,
    sprites: {
      frontDefault: detail.sprites.front_default
    }
  };
}

export async function updateList(state: State): Promise<State> {
  logger.debug('updateList');
  const list = await getList();
  return updatePokemonList(state, list);
}

export async function updateDetail(state: State, name: string): Promise<State> {
  logger.debug('updateDetail');
  const detail = await getDetailByName(name);
  return updatePokemondetail(state, camelCaseImageFront(detail));
}