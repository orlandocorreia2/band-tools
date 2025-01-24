import React, { useCallback, useEffect, useState } from "react";
import uuid from "react-uuid";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicItem from "./components/music-item";
import { getRealTime, save } from "../../infra/database/firebase";

import { MusicDataProps } from "./types";

export default function SetlistPage() {
  const [data, setData] = useState<MusicDataProps[]>([]);

  const init = useCallback(async () => {
    const storedSetlist = await AsyncStorage.getItem("setlist");
    const setList = storedSetlist ? JSON.parse(storedSetlist) : [];
    setData(setList);
    getRealTime({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlist",
      fn: async (setlist: any) => {
        await AsyncStorage.setItem("setlist", JSON.stringify(setlist));
        setData(setlist);
      },
    });

    const musics = [
      "___Part I___",
      "___Intro 1 - 1min___",
      "The Ultimate Sin (1)",
      "Electric Funeral (0)",
      "Lord of this World  (3)",
      "End of the Beginning (1)",
      "Cornucopia (3)",
      "Into the Void (3)",
      "Warning (0)",
      "Beliver (1)",
      "Killing Yourself to Live (3)",
      "I Don’t Know (0)",
      "Crazy Train (0)",
      "___Part II___",
      "Over the Mountain (1)",
      "Snowblind (3)",
      "Black Sabbath (0)",
      "Fairies Wear Boots (0)",
      "War Pigs (0)",
      "The Wizard (0)",
      "N.I.B (0)",
      "Sweet Leaf (0)",
      "Iron Man (0)",
      "Sabbath Bloody Sabbath/Paranoid (0)",
      "Children Of The Grave (3)",
      "___Davi___",
      "Johnny Blade (0)",
      "Mama I'm Coming Home (1)",
      "Mr. Crowley (0)",
      "Bark at the Moon (0)",
      "No More Tears (1 Drop)",
      "Perry Mason (1 Drop)",
    ];

    const setlist: MusicDataProps[] = musics.map((music, index) => ({
      id: uuid(),
      title: music,
      tone: "C",
      tunning: "E",
      metronome: 120,
      timeSignature: "4/4",
      totalTimeInSeconds: 300,
      lyrics: "Letra da música",
      order: index + 1,
      obsevation: "Observacao",
    }));

    save({
      key: "bands",
      data: {
        "5878eab5-b7c3-4da1-89dc-02a3c1d790d7": {
          name: "Eléctric Grave",
          members: {
            [uuid()]: { name: "Orlando Nascimento" },
            [uuid()]: { name: "Alex Coutinho" },
            [uuid()]: { name: "Guilherme" },
            [uuid()]: { name: "Gorba" },
          },
          setlist,
          location: { country: "Brasil", state: "São Paulo" },
          logo: "image.png",
          musicalGenre: "Doom Metal",
          description: "Banda mais foda!",
          bandCreatedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
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
