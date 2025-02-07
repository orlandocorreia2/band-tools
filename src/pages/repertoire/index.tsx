import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import Input from "@/src/components/input";
import Picker from "@/src/components/picker";
import { add, findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import { Info, NoContent } from "./styles";
import ListItem from "@/src/components/list-item";

export default function RepertoirePage() {
  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);
  const [music, setMusic] = useState<MusicDataProps>({} as MusicDataProps);

  const showModalAddMusic = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
    setMusic({} as MusicDataProps);
  }, []);

  const setNewMusic = useCallback((musicItem: MusicDataProps) => {
    setMusic(musicItem);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      const indexMusic = data.findIndex((item) => item.id == id);
      setMusic(data[indexMusic]);
      setModalVisible(true);
    },
    [data]
  );

  const handleSave = useCallback(() => {
    music.id ? updateMusic() : addMusic();
    setMusic({} as MusicDataProps);
    setModalVisible(false);
  }, [music]);

  const addMusic = useCallback(() => {
    add({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire",
      data: {
        ...music,
        order: data?.length ? data.length + 1 : 1,
      },
    });
    init();
  }, [data, music]);

  const renderItem = useCallback(({ item }: { item: MusicDataProps }) => {
    const zIndexByData = data.length - data.findIndex((i) => i.id === item.id);
    return (
      <ListItem
        id={item.id}
        title={item.title}
        zIndex={zIndexByData}
        menu={{
          actions: [
            {
              title: "Editar",
              action: () => handleEdit(item.id),
              color: "#000",
              iconName: "edit",
            },
            {
              title: "Excluir",
              action: () => handleDelete(item.id),
              color: "#000",
              iconName: "trash",
            },
          ],
        }}
      />
    );
  }, []);

  const updateMusic = useCallback(() => {
    save({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire/${music.id}`,
      data: music,
    });
    init();
  }, [music]);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert("Excluir Música", "Deseja realmente exluir esta música?", [
        {
          text: "Cancelar",
          onPress: () => handleMenuIdOpened(""),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const deleteData = data.find((item) => item.id === id);
            if (deleteData) {
              save({
                key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire/${deleteData.id}`,
                data: null,
              });
            }
            handleMenuIdOpened("");
            init();
          },
        },
      ]);
    },
    [data]
  );

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Salvar Música"
        onClose={closeModalAddMusic}
        onSave={handleSave}
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, []);

  const init = useCallback(async () => {
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire",
      fn: async (repertoire: MusicDataProps[]) => {
        const saveData: MusicDataProps[] = [];
        repertoire.forEach((item: MusicDataProps) => {
          saveData.push(item);
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
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
}
