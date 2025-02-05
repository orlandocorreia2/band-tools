import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import Input from "@/src/components/input";
import { add, findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import { Info, NoContent } from "./styles";
import ListItem from "@/src/components/list-item";
import { router, useFocusEffect } from "expo-router";
import { SetlistDataProps } from "./types";

export default function SetlistsPage() {
  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<SetlistDataProps[]>([]);
  const [setlist, setSetlist] = useState<SetlistDataProps>(
    {} as SetlistDataProps
  );

  const showModalAddMusic = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
    setSetlist({} as SetlistDataProps);
  }, []);

  const changeSetlist = useCallback((setlistItem: SetlistDataProps) => {
    setSetlist(setlistItem);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      const indexSetlist = data.findIndex((item) => item.id == id);
      setSetlist(data[indexSetlist]);
      setModalVisible(true);
    },
    [data]
  );

  const addSetlist = useCallback(() => {
    add({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists`,
      data: {
        ...setlist,
        order: data?.length ? data.length + 1 : 1,
      },
    });
    init();
  }, [data, setlist]);

  const updateSetlist = useCallback(() => {
    const setlistId = data.find((item) => item.id === setlist.id)?.id;
    if (setlistId) {
      save({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}`,
        data: setlist,
      });
      init();
    }
  }, [data, setlist]);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert("Excluir Setlist", "Deseja realmente exluir este setlist?", [
        {
          text: "Cancelar",
          onPress: () => handleMenuIdOpened(""),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const itemSetlist = data.find((item) => item.id === id);
            if (itemSetlist) {
              save({
                key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${itemSetlist.id}`,
                data: null,
              });
              init();
            }
          },
        },
      ]);
    },
    [data]
  );

  const handleSave = useCallback(() => {
    setlist.id ? updateSetlist() : addSetlist();
    setSetlist({} as SetlistDataProps);
    setModalVisible(false);
  }, [setlist]);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Salvar Setlist"
        onClose={closeModalAddMusic}
        onSave={handleSave}
      >
        <Input
          title="Título"
          value={setlist.title}
          onChangeText={(value) => changeSetlist({ ...setlist, title: value })}
        />
      </Modal>
    );
  }, [modalVisible, setlist]);

  const init = useCallback(async () => {
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists",
      fn: async (setlists: SetlistDataProps[]) => {
        const saveData: SetlistDataProps[] = [];
        setlists.forEach((item: SetlistDataProps) => {
          saveData.push(item);
        });
        setData(saveData);
        setLoading(false);
      },
    });
  }, []);

  const handlePressItem = useCallback((setlistId: string) => {
    router.navigate(`/setlist/${setlistId}`, { relativeToDirectory: true });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, []);

  useFocusEffect(() => {
    init();
  });

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (modalVisible || !data || !data.length) {
    return (
      <NoContent>
        <Info>Nenhuma setlist adicionado.</Info>
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
          renderItem={({ item, index }) => (
            <ListItem
              id={item.id}
              title={item.title}
              onPress={() => handlePressItem(item.id)}
              isLastItem={data.length > 1 && data.length - 1 === index}
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
