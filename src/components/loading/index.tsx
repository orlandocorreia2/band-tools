import { ActivityIndicator } from "react-native";
import { Container, Icon } from "./styles";

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </Container>
  );
}
