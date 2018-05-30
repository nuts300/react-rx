import * as React from 'react';
import PokemonItem from 'components/presentational/pokemon_item';

export default function List({ list }: {
  list: Array<{ name: string; url: string }>
}) {
  const contents = list.map((v, index) => <PokemonItem key={index} {...v} />);
  return (
  <table className='table'>
      <thead>
          <tr>
              <th>Results({list.length})</th>
          </tr>
      </thead>
      <tbody>
          {contents}
      </tbody>
  </table>
  );
}
