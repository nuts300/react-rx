import _ from 'lodash';
import { Subject }  from 'rxjs';
import { getPokemonList, getPokemonDetailByName } from 'domain/state/reducer/network';
import { updateCurrentpage } from 'domain/state/reducer';

function createAction(reducer) {
  return new Subject().map(payload => _.partialRight(reducer, payload));
}

const getPokemonDetailAction$ = createAction(getPokemonList);
const getPokemonListAction$ = createAction(getPokemonDetailByName);
const updateCurrentpageAction$ = createAction(updateCurrentpage);

const actions = [
  getPokemonDetailAction$,
  getPokemonListAction$,
  updateCurrentpageAction$
];

export function actionStream() {
  return new Subject().merge(...actions);
}

