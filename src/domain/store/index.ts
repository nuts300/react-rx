import { BehaviorSubject } from 'rxjs';
import { initialDetail, initialPage } from 'domain/store/state';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/state');

function createSubject<T>(object: T): BehaviorSubject<T> {
  return new BehaviorSubject(object);
}

export const store = {
  pokemonDetail$: createSubject(initialDetail),
  pokemonList$: createSubject([]),
  currentPage$: createSubject(initialPage)
}
