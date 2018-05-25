import { Item, DetailItem } from 'domain/state/definition';

import _ from 'lodash';
import { Subject, Observable, Observer, of, merge }  from 'rxjs';
import { map } from 'rxjs/operators';
import { updateList, updateDetail } from 'domain/actions/pokemon';
import { updatePage } from 'domain/actions/page';
import { getLogger } from 'utils/logger';

const logger = getLogger('domain/actions');

const actions = {
  updatePokemonDetail: new Subject(),
  updatePokemonList: new Subject(),
  updateCurrentPage: new Subject()
}

function createAction(subject$, func) {
  logger.debug('Create action');
  return subject$.pipe(map(payload => {
    logger.debug('Action map', payload);
    return _.partialRight(func, payload)
  }));
}

export function actionStream(): Observable<any> {
  logger.debug('Merge actions');
  return  merge(
    createAction(actions.updatePokemonDetail, updateDetail),
    createAction(actions.updatePokemonList, updateList),
    createAction(actions.updateCurrentPage, updatePage)
  );
}

export function updatePokemonDetail(detail: DetailItem) {
  actions.updatePokemonDetail.next(detail);
}

export function updatePokemonList(list: Array<Item>): void {
  actions.updatePokemonList.next(list);
}

export function updateCurrentPage(name: string): void {
  actions.updateCurrentPage.next({ name });
}