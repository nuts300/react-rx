import { getLogger } from 'utils/logger';
import { Item, DetailItemFromNetwork } from 'domain/store/state';

type Pokemon = { pokemon: { pokemon: { name: string; url: string } }[] };

const logger = getLogger('domain/middleware/network');
const URL = 'https://pokeapi.co/api/v2/type/1/';
const URL_DETAIL = 'https://pokeapi.co/api/v2/pokemon/';

export async function getList(): Promise<Array<Item>> {
  logger.debug('Requesting list from network', '- list -');
  const resp = await fetch(URL);
  if (resp.ok) {
    const data: Pokemon = await resp.json();
    return data.pokemon.map(e => ({
      name: e.pokemon.name,
      url: e.pokemon.url
    }));
  } else throw new TypeError('getList response is not Ok');
}

export async function getDetailByName(name: string): Promise<DetailItemFromNetwork> {
  logger.debug('Requesting from network', '- element -', name);
  // updateLoading(true);
  const resp = await fetch(`${URL_DETAIL}${name}`);
  if (resp.ok) {
    return resp.json();
  } else throw new TypeError('getDetailByName response is not Ok');
}
