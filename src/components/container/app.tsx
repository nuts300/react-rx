import * as React from 'react';
import { State, PageName } from 'domain/state/definition';
import List from 'components/presentational/list';
import Detail from 'components/presentational/detail';

import { getLogger } from 'utils/logger';

const logger = getLogger('components/container/app');

export default function App({ currentPage, allItems, detail, loading }: State) {
  logger.debug('allItems', allItems, currentPage);
  const content = 
  (pageName => {
    switch (pageName) {
      case 'HOME_PAGE':
        return <List
          list={allItems}
          loading={loading} />;
      case 'DETAIL_PAGE':
        return <Detail detail={detail} loading={loading}/>;
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
