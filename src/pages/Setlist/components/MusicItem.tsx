import { MusicItemInterface } from "../interfaces";

import { Container, Title } from "./styles";

export default function MusicItem({ title }: MusicItemInterface) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
