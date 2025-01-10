import { useCallback, useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import { FlatList } from "react-native";
import MusicItem from "./components/music-item";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import { Info, NoContent } from "./styles";
import Modal from "@/src/components/modal";
import Input from "@/src/components/input";
import Picker from "@/src/components/picker";
import { findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";

export default function RepertoirePage() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);
  const [music, setMusic] = useState<MusicDataProps>({} as MusicDataProps);

  const showModalAddMusic = useCallback(() => {
    setModalVisible(true);
    console.log("Adicionando uma música");
  }, []);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
  }, []);

  const saveModalAddMusic = useCallback(() => {
    const newMusic = {
      ...music,
      id: uuid(),
      order: data?.length ? data.length + 1 : 1,
    };
    const saveData = data && data.length ? data.concat([newMusic]) : [newMusic];
    save("bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire", saveData);
    init();
    setMusic({} as MusicDataProps);
    setModalVisible(false);
  }, [data, music]);

  const setNewMusic = useCallback((musicItem: MusicDataProps) => {
    setMusic(musicItem);
  }, []);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Adicionar Música"
        onClose={closeModalAddMusic}
        onSave={saveModalAddMusic}
      >
        <Input
          title="Título"
          value={music.title}
          onChangeText={(value) => setNewMusic({ ...music, title: value })}
        />
        <Input
          title="Afinação"
          value={music.tone}
          onChangeText={(value) => setNewMusic({ ...music, tone: value })}
        />
        <Picker
          title="Tonalidade"
          selectedValue={music.tunning}
          onValueChange={(value) => setNewMusic({ ...music, tunning: value })}
          items={[
            { label: "A", value: "A" },
            { label: "A#", value: "A#" },
            { label: "B", value: "B" },
            { label: "C", value: "C" },
            { label: "C#", value: "C#" },
            { label: "D", value: "D" },
            { label: "D#", value: "D#" },
            { label: "E", value: "E" },
            { label: "F", value: "F" },
            { label: "F#", value: "F#" },
            { label: "G", value: "G" },
            { label: "G#", value: "G#" },
            { label: "Bb", value: "Bb" },
            { label: "Ab", value: "Ab" },
            { label: "Gb", value: "Gb" },
            { label: "Eb", value: "Eb" },
            { label: "Db", value: "Db" },
          ]}
        />

        <Input
          title="BPM"
          value={music.bpm?.toString()}
          onChangeText={(value) => setNewMusic({ ...music, bpm: value })}
          keyboardType="number-pad"
        />
        <Input
          title="Tempo total da música em segundos"
          value={music.totalTimeInSeconds?.toString()}
          onChangeText={(value) =>
            setNewMusic({ ...music, totalTimeInSeconds: value })
          }
          keyboardType="number-pad"
        />

        <Input
          title="Compasso"
          value={music.timeSignature}
          onChangeText={(value) =>
            setNewMusic({ ...music, timeSignature: value })
          }
        />
        <Input
          title="Letra"
          value={music.lyrics}
          onChangeText={(value) => setNewMusic({ ...music, lyrics: value })}
          multiline={true}
        />
        <Input
          title="Observação"
          value={music.observation}
          onChangeText={(value) =>
            setNewMusic({ ...music, observation: value })
          }
        />
      </Modal>
    );
  }, [modalVisible, music]);

  const init = useCallback(async () => {
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire",
      fn: async (repertoire: MusicDataProps[]) => {
        const saveData: MusicDataProps[] = [];
        repertoire?.forEach((item: MusicDataProps) => {
          if (item.id) {
            saveData.push(item);
          }
        });
        setData(saveData);
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (modalVisible || !data || !data.length) {
    return (
      <NoContent>
        <Info>Nenhuma música adicionada</Info>
        <BtnAdd onPress={showModalAddMusic} />
        {modal}
      </NoContent>
    );
  }

  return (
    <>
      <BtnAdd onPress={showModalAddMusic} />
      {modal}
      {data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MusicItem id={item.id} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}
