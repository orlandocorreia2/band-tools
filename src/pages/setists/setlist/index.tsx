import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, RefreshControl } from "react-native";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import { findAll, getRealTime, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import ListItem from "@/src/components/list-item";
import { router } from "expo-router";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from "react-native-draggable-flatlist";

import { Info, NoContent } from "./styles";

type SetlistPageProps = {
  setlistId: string;
};

export default function SetlistPage({ setlistId }: SetlistPageProps) {
  let countItems = 0;

  const ref = useRef(null);

  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);
  const [repertoire, setRepertoire] = useState<MusicDataProps[]>([]);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleAddMusic = useCallback(
    (item: MusicDataProps) => {
      const response = repertoire.filter((i) => i.id !== item.id);
      if (response.length === 0) setModalVisible(false);
      if (
        !data ||
        !data.length ||
        !data.find((dataItem) => dataItem.id === item.id)
      ) {
        save({
          key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics`,
          data: data.concat(item),
        });
      }
      init();
    },
    [repertoire, data, setlistId]
  );

  const repertoireWithoutAddedSetlist = useMemo(() => {
    const response: MusicDataProps[] = [];
    repertoire.forEach((repertoireItem) => {
      if (!data.find((dataItem) => dataItem.id === repertoireItem.id)) {
        response.push(repertoireItem);
      }
    });
    return response;
  }, [repertoire, data]);

  const showModalAddMusic = useCallback(() => {
    if (
      !repertoireWithoutAddedSetlist ||
      !repertoireWithoutAddedSetlist.length
    ) {
      Alert.alert(
        "Adicionar Música",
        "Não há mais músicas para adicionar no setilist. Deseja acessar a página do repertório para incluir mais músicas?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => {
              router.navigate("/repertoire");
            },
          },
        ]
      );
      return;
    }
    setModalVisible(true);
  }, [repertoireWithoutAddedSetlist]);

  const handleDelete = useCallback(
    (id: string) => {
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
            onPress: () => {
              const itemExclude = data.find((item) => item.id === id);
              if (itemExclude) {
                save({
                  key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics/${itemExclude.id}`,
                  data: null,
                });
              }
              init();
              handleMenuIdOpened("");
            },
          },
        ]
      );
    },
    [data, setlistId]
  );

  const handleDragEnd = useCallback(
    async (drag: { data: MusicDataProps[] }) => {
      setData(drag.data);
      save({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics`,
        data: drag.data,
      });
    },
    []
  );

  const renderItem = useCallback(
    ({ item, drag }: { item: MusicDataProps; drag: () => void }) => {
      const { isActive } = useOnCellActiveAnimation();
      const zIndexByData = data.length - countItems;
      countItems++;

      return (
        <ScaleDecorator>
          <OpacityDecorator activeOpacity={0.5}>
            <ShadowDecorator>
              <ListItem
                id={item.id}
                title={item.title}
                isActive={isActive}
                onLongPress={drag}
                zIndex={zIndexByData}
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
            </ShadowDecorator>
          </OpacityDecorator>
        </ScaleDecorator>
      );
    },
    [data]
  );

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Adicionar Música"
        hideModal={closeModalAddMusic}
      >
        {repertoireWithoutAddedSetlist.map((item) => (
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

  const getRepertoire = useCallback(() => {
    findAll({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire`,
      fn: async (musics: MusicDataProps[]) => {
        setRepertoire(musics);
      },
    });
  }, []);

  const init = useCallback(async () => {
    getRepertoire();
    getRealTime({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics`,
      fn: async (musics: MusicDataProps[]) => {
        setData(musics);
      },
    });
    setLoading(false);
  }, [setlistId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
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
        <DraggableFlatList
          ref={ref}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={handleDragEnd}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
}
