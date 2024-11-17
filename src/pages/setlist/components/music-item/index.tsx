import { MusicItemProps } from "../../types";

import { Container, Title } from "./styles";

export default function MusicItem({ title }: MusicItemProps) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
