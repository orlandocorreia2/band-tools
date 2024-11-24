import { SafeAreaView } from "react-native-safe-area-context";
import { Container, ContainerCards } from "./styles";
import Card from "@/src/components/card";

export default function Home() {
  return (
    <SafeAreaView>
      <Container>
        <ContainerCards>
          <Card
            key={`card-next-date`}
            title="PRÓXIMA DATA"
            informations={["07/12 (Woodstock)"]}
          />
          <Card
            key={`card-next-todos`}
            title="TAREFAS"
            informations={["Tio: Desenvolver app"]}
          />
        </ContainerCards>
      </Container>
    </SafeAreaView>
  );
}
