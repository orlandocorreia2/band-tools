import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicItem from "./components/MusicItem";
import { MusicDataInterface } from "./interfaces";
import { getRealTime } from "../../infra/database/firebase";

import { Container, Version, Title } from "./styles";

export default function Setlist() {
  const [data, setData] = useState<MusicDataInterface[]>([]);

  const init = useCallback(async () => {
    const storedSetlist = await AsyncStorage.getItem("setlist");
    const setList = storedSetlist ? JSON.parse(storedSetlist) : [];
    setData(setList);
    getRealTime({
      key: "setlist",
      fn: async (setlist: any) => {
        await AsyncStorage.setItem("setlist", JSON.stringify(setlist));
        setData(setlist);
      },
    });
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Version>Ver: 1.0.1</Version>
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
