export type HomePage = { name: 'HOME_PAGE' };

export type DetailPage = { name: 'DETAIL_PAGE' };

export type Page = HomePage | DetailPage;

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
  filteredItems: Array<Item>;
  detail: DetailItem;
  shadowColor: string;
  loading: boolean;
};

export const initialState: State = {
  currentPage: { name: 'HOME_PAGE' },
  allItems: [],
  filteredItems: [],
  detail: {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      frontDefault: ''
    }
  },
  shadowColor: '#000',
  loading: true
};
