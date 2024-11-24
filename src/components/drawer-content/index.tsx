import { DrawerContentComponentProps } from "@react-navigation/drawer";
import DrawerButton from "./drawer-button/indext";
import { Container, Content } from "./syles";
import DrawerHeader from "./drawer-header";
import { useCallback } from "react";
import { TabBarButtonProps } from "./drawer-button/types";

export default function DrawerContent(
  drawerProps: DrawerContentComponentProps
) {
  return (
    <Container>
      <DrawerHeader />
      {drawerProps.state.routes.map((route, index) => {
        const isFocused = drawerProps.state.index === index;
        const options = drawerProps.descriptors[route.key].options;
        const onPress = () => {
          const event = drawerProps.navigation.emit({
            type: "drawerItemPress",
            canPreventDefault: true,
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            drawerProps.navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Content key={`drawer-item-button-${index}`}>
            <DrawerButton
              key={options.drawerLabel as string}
              title={options.drawerLabel as TabBarButtonProps["title"]}
              onPress={onPress}
              isFocused={isFocused}
            />
          </Content>
        );
      })}
    </Container>
  );
}
