import React, { useEffect, useState, ChangeEvent } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  IconButton,
  Container,
  Typography,
  makeStyles,
  Grid,
  Input,
} from "@mui/material";

import SpeciesCiudadela from "../api/species-ciudadela";

import { DataUser } from "../interfaces/specie-interface";

const Home = () => {
  const [characters, setCharacters] = useState<DataUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await SpeciesCiudadela();

        if (response) {
          setCharacters(response);
        }
      } catch (error) {
        console.error("Error fetching speciesHuman", error);
      }
    };

    loadCharacters();
  }, []);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        API CIUDADELA
      </Typography>

      <Input
        type="text"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        style={{ marginBottom: "1rem", height: 30 }}
      />

      <Grid container spacing={2}>
        {characters
          .filter((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <ImageListItem sx={{ m: 0 }}>
                <img src={character.image} alt={character.name} />
                <ImageListItemBar
                  title={character.name}
                  subtitle={character.species}
                />
              </ImageListItem>{" "}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
