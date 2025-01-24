import React from "react";
import { MusicComponentProps } from "../../types";
import Menu from "@/src/components/menu";
import { Container, Title } from "./styles";

export default function MusicItem({ id, title, actions }: MusicComponentProps) {
  return (
    <>
      <Menu id={id} actions={actions} />
      <Container>
        <Title>{title}</Title>
      </Container>
    </>
  );
}
