import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import uuid from "react-uuid";
import { DataProps } from "./types";
import Input from "@/src/components/input";
import { findAll, save } from "@/src/infra/database/firebase";
import { useMenu } from "@/src/contexts/menu";

import CrudPageTemplate from "@/src/components/crud-page-template";

export default function SetlistsPage() {
  const { handleMenuIdOpened } = useMenu();
  const [data, setData] = useState<DataProps[]>([]);
  const [itemList, setItemlist] = useState<DataProps>({} as DataProps);

  const setNewSetlist = useCallback((item: DataProps) => {
    setItemlist(item);
  }, []);

  const add = useCallback(() => {
    const newItemData = {
      ...itemList,
      id: uuid(),
      order: data?.length ? data.length + 1 : 1,
    };
    const saveData =
      data && data.length ? data.concat([newItemData]) : [newItemData];
    save({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists",
      data: saveData,
    });
    setData(saveData);
  }, [data, itemList]);

  const update = useCallback(() => {
    setData((data) => {
      const saveItem = {
        ...itemList,
        order: data?.length ? data.length + 1 : 1,
      };
      let itemIndex = 0;
      const updatedData = data.map((item, index) => {
        if (item.id == itemList.id) {
          itemIndex = index;
          return saveItem;
        }
        return item;
      });
      save({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/repertoire/${itemIndex}`,
        data: saveItem,
      });
      return updatedData;
    });
  }, [itemList]);

  const handleSave = useCallback(() => {
    itemList.id ? update() : add();
    setItemlist({} as DataProps);
  }, [itemList]);

  const handleEdit = useCallback(
    (id: string, fn?: () => void) => {
      const indexData = data.findIndex((item) => item.id == id);
      setItemlist(data[indexData]);
      if (fn) fn();
    },
    [data]
  );

  const handleDelete = useCallback((id: string) => {
    Alert.alert("Excluir Setlist", "Deseja realmente exluir este setlist?", [
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
              key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists",
              data: updatedData,
            });
            return updatedData;
          }),
      },
    ]);
  }, []);

  const init = useCallback(async (fn?: () => void) => {
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/setlists",
      fn: async (repertoire: DataProps[]) => {
        const saveData: DataProps[] = [];
        repertoire?.forEach((item: DataProps) => {
          if (item.id) {
            saveData.push(item);
          }
        });
        setData(saveData);
      },
    });
    if (fn) fn();
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <CrudPageTemplate
      init={init}
      closeModal={() => setItemlist({} as DataProps)}
      handleSave={handleSave}
      modalBody={
        <Input
          title="Título"
          value={itemList.title}
          onChangeText={(value) => setNewSetlist({ ...itemList, title: value })}
        />
      }
      data={data}
      itemList={itemList}
      listMenu={{
        actions: [
          {
            title: "Editar",
            action: (id, fn) => handleEdit(id, fn),
            color: "#2b77fb",
            iconName: "edit",
            showModal: true,
          },
          {
            title: "Excluir",
            action: (id) => handleDelete(id),
            color: "#df4344",
            iconName: "trash",
          },
        ],
      }}
    />
  );
}
