import React from "react";
import { listItemProps } from "./types/item";
import { Container, Title } from "./styles";
import Menu from "../menu";

export default function ListItem({
  id,
  title,
  menu,
  onPress = () => {},
  showModal,
}: listItemProps) {
  return (
    <>
      {menu && Object.keys(menu)[0] && (
        <Menu id={id} actions={menu.actions} showModal={showModal} />
      )}
      <Container onPress={onPress}>
        <Title>{title}</Title>
      </Container>
    </>
  );
}
