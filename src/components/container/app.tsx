import * as React from 'react';
import { State, PageName } from 'domain/store/state';
import List from 'components/presentational/list';
import Detail from 'components/presentational/detail';
import { connect } from 'domain/store/connecter';
import { store } from 'domain/store';

import { getLogger } from 'utils/logger';

const logger = getLogger('components/container/app');

function App({ currentPage, allItems, detail }: State): JSX.Element {
  logger.debug('allItems', allItems, currentPage);
  const content = 
  (pageName => {
    switch (pageName) {
      case 'HOME_PAGE':
        return <List
          list={allItems} />;
      case 'DETAIL_PAGE':
        return <Detail detail={detail} />;
      default:
        return <p>Page not found</p>;
    }
  })(currentPage.name);
  return (
    <div className="App">
      <h1>This is App!!!!!! {currentPage.name}</h1>
      {content}
    </div>
  );
}

export default connect({
  detail: store.pokemonDetail.source$,
  allItems: store.pokemonList.source$,
  currentPage: store.currentPage.source$
})(App);