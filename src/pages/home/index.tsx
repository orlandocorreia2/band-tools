import { SafeAreaView } from "react-native-safe-area-context";
import { Container, ContainerCards } from "./styles";
import Card from "@/src/components/card";
import { useCallback, useEffect, useState } from "react";
import { findAll } from "@/src/infra/database/firebase";
import { ScheduleDataProps } from "../schedule/types";
import Loading from "@/src/components/loading";
import { formatDatePtBr } from "@/src/utils/date";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ScheduleDataProps[]>([]);

  const init = useCallback(() => {
    findAll({
      key: "bands/5878eab5-b7c3-4da1-89dc-02a3c1d790d7/schedules",
      fn: async (schedules: ScheduleDataProps[]) => {
        const saveData: ScheduleDataProps[] = [];
        schedules.forEach((item: ScheduleDataProps) => {
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

  return (
    <SafeAreaView>
      <Container>
        <ContainerCards>
          {data.map((item) => (
            <Card
              key={`card-next-date`}
              title="PRÓXIMA DATA"
              informations={[`${item.title}`]}
            />
          ))}
        </ContainerCards>
      </Container>
    </SafeAreaView>
  );
}
