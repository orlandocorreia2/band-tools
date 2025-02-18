import React from "react";
import { listItemProps } from "./types/item";
import { Container, ContainerTitle, Title } from "./styles";
import Menu from "../menu";

export default function ListItem({
  id,
  title,
  menu,
  onPress = () => {},
  onLongPress = () => {},
  showModal,
  isActive = false,
  zIndex = 1,
}: listItemProps) {
  return (
    <Container
      onLongPress={onLongPress}
      onPress={onPress}
      isActive={isActive}
      zIndex={zIndex}
    >
      <ContainerTitle>
        <Title>{title}</Title>
      </ContainerTitle>

      {menu && Object.keys(menu)[0] && (
        <Menu id={id} actions={menu.actions} showModal={showModal} />
      )}
    </Container>
  );
}
