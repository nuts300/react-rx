import page from 'page';

import { getLogger } from 'utils/logger';
import { updateCurrentPage, getPokemonList, getPokemonDetail } from 'domain/actions';

type Context = { params: { name: string } };
type OnRoute = (ctx: Context) => void;

const logger = getLogger('domain/middleware/router');

function detailRouter(onRoute: OnRoute) {
  page('/detail/:name', onRoute);
}

function homeRouter(onRoute: OnRoute) {
  page('', onRoute);
}
export default function startRouters() {
  detailRouter((ctx: Context) => {
    logger.debug('Detail route');
    const name = ctx.params.name;
    getPokemonDetail(name);
    updateCurrentPage('DETAIL_PAGE');
  });

  homeRouter(ctx => {
    logger.debug('Home route');
    getPokemonList();
    updateCurrentPage('HOME_PAGE');
  });

  page();
}

export function detailRoute(name: string) {
  return `/detail/${name}`;
}