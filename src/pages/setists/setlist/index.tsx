import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import { findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import { Info, NoContent } from "./styles";
import ListItem from "@/src/components/list-item";
import { KeyTypeProps } from "@/src/types";

type SetlistPageProps = {
  index: number;
};

export default function SetlistPage({ index }: SetlistPageProps) {
  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);
  const [repertoire, setRepertoire] = useState<MusicDataProps[]>([]);

  const showModalAddMusic = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleAddMusic = useCallback((item: MusicDataProps) => {
    setRepertoire((dataRepertoire) => {
      const response = dataRepertoire.filter((i) => i.id !== item.id);
      if (response.length === 0) setModalVisible(false);
      setData((data) => {
        if (!data.find((dataItem) => dataItem.id === item.id)) {
          data.push({ ...item, order: data.length + 1 });
          save({
            key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}/musics`,
            data,
          });
        }
        return data;
      });
      return response;
    });
  }, []);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Adicionar Música"
        hideModal={closeModalAddMusic}
      >
        {repertoire.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            onPress={() => handleAddMusic(item)}
          />
        ))}
      </Modal>
    );
  }, [modalVisible, repertoire]);

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
              const itemExclude = data.find((item) => item.id === id);
              const updatedData = data.filter((item) => item.id !== id);
              save({
                key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}/musics`,
                data: updatedData,
              });
              if (itemExclude) {
                setRepertoire((dataRepertoire) => {
                  return dataRepertoire.concat([itemExclude]);
                });
              }
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

  const getRepertoire = useCallback(
    (savedData: MusicDataProps[]) => {
      const savedDataKeys: KeyTypeProps = {};
      savedData.forEach((item) => {
        savedDataKeys[item.id] = true;
      });
      findAll({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire`,
        fn: async (musics: MusicDataProps[]) => {
          const saveData: MusicDataProps[] = [];
          if (musics && musics.length) {
            musics.forEach((item: MusicDataProps) => {
              if (item.id && !savedDataKeys[item.id]) {
                saveData.push(item);
              }
            });
          }
          setRepertoire(saveData);
          setLoading(false);
        },
      });
    },
    [data]
  );

  const init = useCallback(async () => {
    findAll({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${index}/musics`,
      fn: async (musics: MusicDataProps[]) => {
        const savedData: MusicDataProps[] = [];
        if (musics && musics.length) {
          musics?.forEach((item: MusicDataProps) => {
            if (item.id) {
              savedData.push(item);
            }
          });
          setData(savedData);
        }
        getRepertoire(savedData);
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
        {repertoire.length > 0 && <BtnAdd onPress={showModalAddMusic} />}
        {modal}
      </NoContent>
    );
  }

  return (
    <>
      {repertoire.length > 0 && <BtnAdd onPress={showModalAddMusic} />}
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
