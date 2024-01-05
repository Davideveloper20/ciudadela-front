import { request, gql, GraphQLClient } from 'graphql-request';

import { DataUser, DataUserResponse } from '../interfaces/specie-interface';

const SpeciesCiudadela = async (): Promise<DataUser[]> => {
  const query = gql`
    query {
      characters {
        results {
          id
          name
          status
          species
          image
        }
      }
    }
  `;

  try {
    const response = await request<DataUserResponse>('http://localhost:4000/api/characters', query, {
      method: 'POST',
    });

    const data = response.characters.results || [];

    const humanCharacters = data.filter((character) => character.species === 'Human');

    return humanCharacters;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; 
  }
};

export default SpeciesCiudadela;

