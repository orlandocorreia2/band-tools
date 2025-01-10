import { SafeAreaView } from "react-native-safe-area-context";
import { MusicComponentProps } from "../../types";

import { Container, Title } from "./styles";

export default function MusicItem({ title }: MusicComponentProps) {
  return (
    <SafeAreaView>
      <Container>
        <Title>{title}</Title>
      </Container>
    </SafeAreaView>
  );
}
