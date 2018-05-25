export type PageName = 'HOME_PAGE' | 'DETAIL_PAGE';

export type Page = { name: PageName }

export type Item = { name: string; url: string };

export type DetailItem = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    frontDefault: string;
  };
};

export type DetailItemFromNetwork = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

export type State = {
  currentPage: Page;
  allItems: Array<Item>;
  detail: DetailItem;
};

export const initialDetail: DetailItem = {
  name: '',
  height: 0,
  weight: 0,
  sprites: {
    frontDefault: ''
  }
}

export const initialPage: Page = {
  name: 'HOME_PAGE'
}

export const initialState: State = {
  currentPage: initialPage,
  allItems: [],
  detail: initialDetail
};
