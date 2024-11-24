import { SafeAreaView } from "react-native-safe-area-context";
import { MusicItemProps } from "../../types";

import { Container, Title } from "./styles";

export default function MusicItem({ title }: MusicItemProps) {
  return (
    <SafeAreaView>
      <Container>
        <Title>{title}</Title>
      </Container>
    </SafeAreaView>
  );
}
