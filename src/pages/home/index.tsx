import { SafeAreaView } from "react-native-safe-area-context";
import { Container, ContainerCards, Title } from "./styles";
import Card from "@/src/components/card";

export default function Home() {
  return (
    <SafeAreaView>
      <Container>
        <Title>Página Inicial</Title>
        <ContainerCards>
          <Card title="PROX. DT" informations={["26/10"]} />
          <Card title="CAIXA" informations={["R$ 59,00"]} />
          <Card
            title="TAREFAS"
            informations={[
              "Tio: Desenvolver app",
              "Alex: Verificar data Relica's",
            ]}
          />
        </ContainerCards>
      </Container>
    </SafeAreaView>
  );
}
