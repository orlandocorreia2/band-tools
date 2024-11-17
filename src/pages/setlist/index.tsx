import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicItem from "./components/music-item";
import { getRealTime } from "../../infra/database/firebase";

import { MusicDataProps } from "./types";

export default function SetlistPage() {
  const [data, setData] = useState<MusicDataProps[]>([]);

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
    <>
      {data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => <MusicItem title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}
