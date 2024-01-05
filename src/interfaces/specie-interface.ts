export interface DataUser {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
}
  
export interface DataUserResponse {
    characters: {
      results: DataUser[];
    };
}