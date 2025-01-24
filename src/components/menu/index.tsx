import React, { useCallback, useMemo } from "react";
import { useMenu } from "@/src/contexts/menu";
import uuid from "react-uuid";
import {
  Container,
  Content,
  MenuItem,
  MenuItemText,
  Separator,
} from "./styles";
import { Icon } from "@/src/shared/styles";

export type MenuProps = {
  id: string;
  actions: {
    edit: (id: string) => void;
    delete: (id: string) => void;
  };
};

export default function Menu({ id, actions }: MenuProps) {
  const { menuIdOpened, handleMenuIdOpened } = useMenu();

  const componentId = useMemo(() => {
    return uuid();
  }, []);

  const toggleMenu = useCallback(() => {
    const setComponentId = menuIdOpened === componentId ? "" : componentId;
    handleMenuIdOpened(setComponentId);
  }, [menuIdOpened]);

  return (
    <Container onPress={toggleMenu}>
      <Icon name="more-vertical" color="#fff" />
      {componentId === menuIdOpened && (
        <Content>
          {actions.edit != undefined && (
            <MenuItem onPress={() => actions.edit(id)}>
              <Icon name="edit" color="#2b77fb" fontSize={18} />
              <MenuItemText color="#2b77fb" fontSize={18}>
                Editar
              </MenuItemText>
            </MenuItem>
          )}
          {actions.delete != undefined && (
            <>
              <Separator />
              <MenuItem onPress={() => actions.delete(id)}>
                <Icon name="trash" color="red" fontSize={18} />
                <MenuItemText color="red" fontSize={18}>
                  Excluir
                </MenuItemText>
              </MenuItem>
            </>
          )}
        </Content>
      )}
    </Container>
  );
}
