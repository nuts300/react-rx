
import * as React from 'react';

export default function PokemonItem({ name, url }) {
    return (
    <tr>
        <td><a href={`/detail/${name}`}>{name}</a></td>
        <td>{url}</td>
    </tr>
    );
}
