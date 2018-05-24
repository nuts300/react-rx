import * as React from 'react';

export default function Detail({ detail, loading }: {
  detail: {
    name: string;
    height: number;
    weight: number;
    sprites: {
      frontDefault: string;
    }
  },
  loading: boolean
}) {
  return (
  <div>
      <h2>Pokemon Detail!!!</h2>
      <div>
          <div className="column-sm-10">
              <table className="table">
                  <thead>
                  <tr>
                      <th>Name</th>
                      <th>Height</th>
                      <th>Weight</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      loading?
                      <tr>
                          <td>Now loading ...</td>
                          <td></td>
                          <td></td>
                      </tr>:
                      <tr>
                          <td>{detail.name}</td>
                          <td>{detail.height}</td>
                          <td>{detail.weight}</td>
                      </tr>
                  }
                  </tbody>
              </table>
          </div>
          <div className="column-sm-2">
          {
              !loading  && detail.sprites &&
              <img src={ detail.sprites.frontDefault } alt={detail.name} />   
          }
          </div>
      </div>
  </div>
  );
}