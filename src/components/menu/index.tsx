import React, { useCallback, useMemo } from "react";
import { useMenu } from "@/src/contexts/menu";
import uuid from "react-uuid";
import {
  Container,
  Content,
  MenuItem,
  MenuItemContainer,
  MenuItemText,
  Separator,
} from "./styles";
import { Icon } from "@/src/shared/styles";
import { MenuProps } from "./types";

export default function Menu({
  id,
  actions,
  showModal,
  isLastItem = false,
}: MenuProps) {
  const { menuIdOpened, handleMenuIdOpened } = useMenu();

  const styleTopValue = useMemo(() => {
    if (!actions || actions.length < 2) return 24;
    if (isLastItem) return -(actions.length * 30);
    return 24;
  }, []);

  const componentId = useMemo(() => {
    return uuid();
  }, []);

  const toggleMenu = useCallback(() => {
    const setComponentId = menuIdOpened === componentId ? "" : componentId;
    handleMenuIdOpened(setComponentId);
  }, [menuIdOpened]);

  const handleAction = useCallback(
    (action: (id: string) => void, actionShowModal?: boolean) => {
      if (id) action(id);
      if (showModal && actionShowModal) showModal();
    },
    [menuIdOpened]
  );

  return (
    <Container onPress={toggleMenu}>
      <Icon name="more-vertical" color="#fff" />
      {componentId === menuIdOpened && actions && actions.length && (
        <Content styleTopValue={styleTopValue}>
          {actions.map(
            ({ title, action, color, iconName, showModal }, index) => (
              <MenuItemContainer key={`${index}-${title}`}>
                {index > 0 && <Separator />}
                {id && (
                  <MenuItem
                    onPress={() => {
                      handleAction(action, showModal);
                    }}
                  >
                    {iconName && (
                      <Icon
                        name={iconName}
                        color={color ?? "#000"}
                        fontSize={18}
                      />
                    )}
                    <MenuItemText color={color ?? "#000"} fontSize={18}>
                      {title}
                    </MenuItemText>
                  </MenuItem>
                )}
              </MenuItemContainer>
            )
          )}
        </Content>
      )}
    </Container>
  );
}
