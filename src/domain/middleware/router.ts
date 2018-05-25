import page from 'page';

import { getLogger } from 'utils/logger';
import { getList, getDetailByName, onListFromNetwork, onDetailFromNetwork } from 'domain/middleware/network';
import { updateCurrentPage } from 'domain/actions';

type Context = { params: { name: string } };
type OnRoute = (ctx: Context) => void;

const logger = getLogger('domain/middleware/router');

function detailRouter(onRoute: OnRoute) {
  logger.debug('Register on detail router');
  page('/detail/:name', onRoute);
}

function homeRouter(onRoute: OnRoute) {
  logger.debug('Register on home router');
  page('', onRoute);
}
export default function startRouters() {
  logger.debug('Start routers');
  detailRouter((ctx: Context) => {
    logger.debug('Detail route');
    const name = ctx.params.name;
    getDetailByName(name).then(onDetailFromNetwork);
    updateCurrentPage('DETAIL_PAGE');
  });

  homeRouter(ctx => {
    logger.debug('Home route');
    getList().then(onListFromNetwork);
    updateCurrentPage('HOME_PAGE');
  });
  page();
}

export function detailRoute(name: string) {
  return `/detail/${name}`;
}