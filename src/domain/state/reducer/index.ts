import { getLogger } from 'utils/logger';

const logger = getLogger('domain/state/reducer/network');

export function updateCurrentpage(state, pageName) {
  logger.debug('start updateCurrentpage', state, pageName);
  return {...state, pageName }; // TODO
}

