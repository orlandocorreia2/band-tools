import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { CrudPageTemplateProps } from "./types";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import Loading from "@/src/components/loading";
import { Info, NoContent } from "./styles";
import ListItem from "@/src/components/list-item";

export default function CrudPageTemplate({
  init,
  closeModal,
  handleSave,
  modalBody,
  data,
  itemList,
  listMenu,
}: CrudPageTemplateProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const closeModalAdd = useCallback(() => {
    setModalVisible(false);
    closeModal();
  }, []);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Salvar Setlist"
        onClose={closeModalAdd}
        onSave={handleSave}
        hideModal={hideModal}
      >
        {modalBody}
      </Modal>
    );
  }, [modalVisible, itemList]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    init(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    init(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (modalVisible || !data || !data.length) {
    return (
      <NoContent>
        <Info>Nenhum setlist encontrado.</Info>
        <BtnAdd onPress={showModal} />
        {modal}
      </NoContent>
    );
  }

  return (
    <>
      <BtnAdd onPress={showModal} />
      {modal}
      {data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.title}
              menu={listMenu}
              showModal={showModal}
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
