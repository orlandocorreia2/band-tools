import React, { useCallback, useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import { Alert, FlatList, RefreshControl } from "react-native";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import Picker from "@/src/components/picker";
import { findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import { Info, NoContent } from "./styles";
import ListItem from "@/src/components/list-item";

type SetlistPageProps = {
  index: number;
};

export default function SetlistPage({ index }: SetlistPageProps) {
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

  const addMusic = useCallback(() => {
    const newMusic = {
      ...music,
      id: uuid(),
      order: data?.length ? data.length + 1 : 1,
    };
    const saveData = data && data.length ? data.concat([newMusic]) : [newMusic];
    save({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}`,
      data: saveData,
    });
    setData(saveData);
  }, [data, music]);

  const updateMusic = useCallback(() => {
    setData((data) => {
      const saveMusic = { ...music, order: data?.length ? data.length + 1 : 1 };
      let musicIndex = 0;
      const updatedData = data.map((item, index) => {
        if (item.id == music.id) {
          musicIndex = index;
          return saveMusic;
        }
        return item;
      });
      save({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}`,
        data: saveMusic,
      });
      return updatedData;
    });
  }, [music]);

  const handleSave = useCallback(() => {
    music.id ? updateMusic() : addMusic();
    setMusic({} as MusicDataProps);
    setModalVisible(false);
  }, [music]);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Salvar Música"
        onClose={closeModalAddMusic}
        onSave={handleSave}
      >
        <Picker
          title="Selecione a música do repertório."
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
      </Modal>
    );
  }, [modalVisible, music]);

  const handleEdit = useCallback(
    (id: string) => {
      const indexMusic = data.findIndex((item) => item.id == id);
      setMusic(data[indexMusic]);
      setModalVisible(true);
    },
    [data]
  );

  const handleDelete = useCallback((id: string) => {
    Alert.alert(
      "Excluir Música",
      "Deseja realmente exluir esta música do setlist?",
      [
        {
          text: "Cancelar",
          onPress: () => handleMenuIdOpened(""),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setData((data) => {
              const updatedData = data.filter((item) => item.id != id);
              save({
                key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}`,
                data: updatedData,
              });
              return updatedData;
            }),
        },
      ]
    );
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, []);

  const init = useCallback(async () => {
    findAll({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}`,
      fn: async (musics: MusicDataProps[]) => {
        if (musics && musics.length) {
          const saveData: MusicDataProps[] = [];
          musics?.forEach((item: MusicDataProps) => {
            if (item.id) {
              saveData.push(item);
            }
          });
          setData(saveData);
        }
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
        <Info>Nenhuma música adicionada no setlist</Info>
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
            <ListItem
              id={item.id}
              title={item.title}
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
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
}
