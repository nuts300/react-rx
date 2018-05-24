import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state/reducer/network');

export function getPokemonList(state) {
  logger.debug('start getPokemonList', state);
  return state; // TODO
}

export function getPokemonDetailByName(state, name) {
  logger.debug('start getPokemonList', state, name);
  return state; // TODO
}