import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import BtnAdd from "@/src/components/btn-add";
import Modal from "@/src/components/modal";
import Input from "@/src/components/input";
import { add, findAll, save } from "@/src/infra/database/firebase";
import Loading from "@/src/components/loading";
import { useMenu } from "@/src/contexts/menu";
import ListItem from "@/src/components/list-item";
import { ScheduleDataProps } from "./types";
import DateTimePicker from "@/src/components/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import {
  dateString,
  dayOfWeekByDate,
  getDate,
  getTimezone,
  hourString,
} from "@/src/utils/date";

import { Info, NoContent } from "./styles";
import Picker from "@/src/components/picker";

export default function SetlistsPage() {
  let countItems = 0;

  const { handleMenuIdOpened } = useMenu();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<ScheduleDataProps[]>([]);
  const [schedule, setSchedule] = useState<ScheduleDataProps>(
    {} as ScheduleDataProps
  );

  const showModalAddSchedule = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModalAddMusic = useCallback(() => {
    clear();
  }, []);

  const changeSchedule = useCallback((scheduleItem: ScheduleDataProps) => {
    setSchedule(scheduleItem);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      const itemSetlist = data.find((i) => i.id === id);
      if (itemSetlist) {
        setSchedule(itemSetlist);
        setModalVisible(true);
      }
    },
    [data]
  );

  const addSchedule = useCallback(() => {
    add({
      key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/schedules`,
      data: {
        ...schedule,
        date: dateString(schedule.date),
        startHour: hourString(schedule.startHour),
        endHour: hourString(schedule.endHour),
      },
    });
    init();
  }, [schedule]);

  const updateSchedule = useCallback(() => {
    const setlistId = data.find((item) => item.id === schedule.id)?.id;
    if (setlistId) {
      save({
        key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/schedules/${setlistId}`,
        data: {
          ...schedule,
          date: schedule.date.toISOString(),
          startHour: hourString(schedule.startHour),
          endHour: hourString(schedule.endHour),
        },
      });
      init();
    }
  }, [data, schedule]);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "Excluir Setlist",
        "Deseja realmente exluir este agendamento?",
        [
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
                  key: `bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/schedules/${itemSetlist.id}`,
                  data: null,
                });
                init();
              }
            },
          },
        ]
      );
    },
    [data]
  );

  const handleChangeDatetime = useCallback(
    (_: DateTimePickerEvent, value: Date | undefined) => {
      if (value) {
        const newValue = getTimezone(value);
        setSchedule((scheduleData) => ({
          ...scheduleData,
          date: newValue,
          dayOfWeek: dayOfWeekByDate(newValue),
        }));
      }
    },
    []
  );

  const handleChangeStartHourTime = useCallback(
    (_: DateTimePickerEvent, value: Date | undefined) => {
      if (value) {
        const newValue = getTimezone(value);
        setSchedule((scheduleData) => ({
          ...scheduleData,
          startHour: newValue,
        }));
      }
    },
    []
  );

  const handleChangeEndHourTime = useCallback(
    (_: DateTimePickerEvent, value: Date | undefined) => {
      if (value) {
        const newValue = getTimezone(value);
        setSchedule((scheduleData) => ({
          ...scheduleData,
          endHour: newValue,
        }));
      }
    },
    []
  );

  const handleSave = useCallback(() => {
    schedule.id ? updateSchedule() : addSchedule();
    clear();
  }, [schedule]);

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        title="Salvar Agendamento"
        onClose={closeModalAddMusic}
        onSave={handleSave}
      >
        <Input
          title="Título"
          value={schedule.title}
          onChangeText={(value) =>
            changeSchedule({ ...schedule, title: value })
          }
        />

        <DateTimePicker
          value={schedule.date}
          label="Data"
          placeholder={dateString(schedule.date)}
          mode={"date"}
          onChange={handleChangeDatetime}
        />

        <Picker
          title="Dia da semana"
          selectedValue={schedule.dayOfWeek}
          items={[
            { label: "Segunda", value: "monday" },
            { label: "Terça", value: "tuesday" },
            { label: "Quarta", value: "wednesday" },
            { label: "Quinta", value: "thursday" },
            { label: "Sexta", value: "friday" },
            { label: "Sábado", value: "saturday" },
            { label: "Domingo", value: "monday" },
          ]}
          enabled={false}
        />

        <DateTimePicker
          value={schedule.startHour}
          label="Hora Início"
          placeholder={hourString(schedule.startHour)}
          mode={"time"}
          onChange={handleChangeStartHourTime}
        />

        <DateTimePicker
          value={schedule.endHour}
          label="Hora Fim"
          placeholder={hourString(schedule.endHour)}
          mode={"time"}
          onChange={handleChangeEndHourTime}
        />

        <Input
          title="Telefone"
          value={schedule.phone}
          keyboardType={"phone-pad"}
          maxLength={11}
          onChangeText={(value) =>
            changeSchedule({ ...schedule, phone: value })
          }
        />

        <Input
          title="Telefone(2)"
          value={schedule.phone2}
          keyboardType={"phone-pad"}
          maxLength={11}
          onChangeText={(value) =>
            changeSchedule({ ...schedule, phone2: value })
          }
        />

        <Input
          title="Endereço"
          value={schedule.address}
          onChangeText={(value) =>
            changeSchedule({ ...schedule, address: value })
          }
        />

        <Input
          title="Observaçoes"
          value={schedule.observations}
          multiline={true}
          onChangeText={(value) =>
            changeSchedule({ ...schedule, observations: value })
          }
        />
      </Modal>
    );
  }, [modalVisible, schedule]);

  const clear = useCallback(() => {
    setModalVisible(false);
    setSchedule({
      date: getDate(),
      startHour: getDate(),
      endHour: getDate(),
    } as ScheduleDataProps);
  }, []);

  const init = useCallback(async () => {
    clear();
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/schedules",
      fn: async (schedules: ScheduleDataProps[]) => {
        const saveData: ScheduleDataProps[] = [];
        schedules.forEach((item: ScheduleDataProps) => {
          saveData.push({
            ...item,
            date: getTimezone(new Date(item.date)),
            startHour: getTimezone(new Date(`${item.date} ${item.startHour}`)),
            endHour: getTimezone(new Date(`${item.date} ${item.endHour}`)),
          });
        });
        setData(saveData);
        setLoading(false);
      },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ScheduleDataProps; index: number }) => {
      const zIndexByData = data.length - countItems;
      countItems++;
      return (
        <ListItem
          key={item.id}
          id={item.id}
          title={`${item.title}-${dateString(item.date)}-${item.dayOfWeek}`}
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
    },
    [data]
  );

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
        <Info>Nenhuma agendamento adicionado.</Info>
        <BtnAdd onPress={showModalAddSchedule} />
        {modal}
      </NoContent>
    );
  }

  return (
    <>
      <BtnAdd onPress={showModalAddSchedule} />
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
