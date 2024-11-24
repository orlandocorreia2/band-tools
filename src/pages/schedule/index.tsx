import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import MusicItem from "./components/music-item";
import { MusicDataProps } from "./types";
import BtnAdd from "@/src/components/btn-add";

import { Info, NoContent, Title } from "./styles";
import Modal from "@/src/components/modal";

export default function SchedulePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<MusicDataProps[]>([]);

  const showModalAddMusic = useCallback(() => {
    setModalVisible(true);
    console.log("Adicionando uma data pra show");
  }, []);

  const closeModalAddMusic = useCallback(() => {
    setModalVisible(false);
    console.log("dsoijdfodiif");
  }, []);

  const init = useCallback(async () => {}, []);

  useEffect(() => {
    init();
  }, []);

  if (!data.length) {
    return (
      <NoContent>
        <Info>Nenhuma data agendada</Info>
        <BtnAdd onPress={showModalAddMusic} />

        <Modal
          visible={modalVisible}
          title="Adicionar Data"
          onClose={closeModalAddMusic}
        />
      </NoContent>
    );
  }

  return (
    <>
      <Title>Data de Show</Title>

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
