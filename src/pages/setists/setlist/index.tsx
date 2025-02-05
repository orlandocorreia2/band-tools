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
import { findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import ListItem from "@/src/components/list-item";
import { KeyTypeProps } from "@/src/types";
import { router, useFocusEffect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from "react-native-draggable-flatlist";

import { Info, NoContent } from "./styles";
import { useIsFocused } from "@react-navigation/native";

type SetlistPageProps = {
  setlistId: string;
};

export default function SetlistPage({ setlistId }: SetlistPageProps) {
  const ref = useRef(null);

  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);
  const [repertoire, setRepertoire] = useState<MusicDataProps[]>([]);

  const showModalAddMusic = useCallback(() => {
    if (!repertoire || !repertoire.length) {
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
  }, [repertoire]);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleAddMusic = useCallback(
    (item: MusicDataProps) => {
      const response = repertoire.filter((i) => i.id !== item.id);
      if (response.length === 0) setModalVisible(false);
      if (!data.find((dataItem) => dataItem.id === item.id)) {
        save({
          key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics/${item.id}`,
          data: item,
        });
      }
      init();
    },
    [repertoire, data, setlistId]
  );

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

  const renderItem = ({
    item,
    drag,
  }: {
    item: MusicDataProps;
    drag: () => void;
  }) => {
    const { isActive } = useOnCellActiveAnimation();
    const isLastItem = false;

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <ListItem
              id={item.id}
              title={item.title}
              isLastItem={isLastItem}
              isActive={isActive}
              onLongPress={drag}
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
  };

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

  const getRepertoire = useCallback((savedData: MusicDataProps[]) => {
    const savedDataKeys: KeyTypeProps = {};
    savedData.forEach((item) => {
      savedDataKeys[item.id] = true;
    });

    findAll({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire`,
      fn: async (musics: MusicDataProps[]) => {
        const saveData: MusicDataProps[] = [];
        musics.forEach((item: MusicDataProps) => {
          if (!savedDataKeys[item.id]) saveData.push(item);
        });
        setRepertoire(saveData);
        setLoading(false);
      },
    });
  }, []);

  const init = useCallback(async () => {
    findAll({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists/${setlistId}/musics`,
      fn: async (musics: MusicDataProps[]) => {
        const savedData: MusicDataProps[] = [];
        musics.forEach((item: MusicDataProps) => {
          savedData.push(item);
        });
        setData(savedData);
        getRepertoire(savedData);
      },
    });
  }, [setlistId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setData((data) => {
        if (!data.length) init();
      });

      return () => {
        Alert.alert("Perdeu o foco e vai limpar os dados");
        setData([]);
      };
    }, [])
  );

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
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
}
