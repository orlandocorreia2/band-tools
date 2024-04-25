import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import uuid from "react-native-uuid";
import MusicItem from "./components/MusicItem";
import { MusicDataInterface } from "./interfaces";

import { Container, Title } from "./styles";

export default function Setlist() {
  const [data, setData] = useState<MusicDataInterface[]>([]);

  useEffect(() => {
    const musics = [
      "End of the Beginning",
      "Warning",
      "Electric Funeral",
      "Holy Diver",
      "Wheels of Confusion",
      "Snowblind",
      "Fairies Wear Boots",
      "Mr. Crowley",
      "Stargazer",
      "War Pigs",
      "Into The Void",
      "Iron Man",
      "Sweet Leaf",
      "Black Sabbath",
      "Under the Sun",
      "Heaven and Hell",
      "Paranoid",
      "Bark at the Moon",
      "Crazy Train",
      "N.I.B",
      "Children of the Grave",
    ];

    setData(
      musics.map((music) => ({
        id: uuid.v4().toString(),
        title: music,
      }))
    );
  }, []);

  return (
    <Container>
      <Title>SETLIST</Title>
      <FlatList
        data={data}
        renderItem={({ item }) => <MusicItem title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}
