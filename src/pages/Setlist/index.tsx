import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import MusicItem from "./components/MusicItem";
import { MusicDataInterface } from "./interfaces";
import { getRealTime } from "../../infra/database/firebase";

import { Container, Title } from "./styles";

export default function Setlist() {
  const [data, setData] = useState<MusicDataInterface[]>([]);

  useEffect(() => {
    getRealTime("setlists", setData);
  }, []);

  return (
    <Container>
      <Title>SETLIST</Title>
      {data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => <MusicItem title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </Container>
  );
}
