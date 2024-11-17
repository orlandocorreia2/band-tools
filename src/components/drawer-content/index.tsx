import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View } from "react-native";
import DrawerButton from "./drawer-button/indext";
import { Content } from "./syles";

export default function DrawerContent(
  drawerProps: DrawerContentComponentProps
) {
  return (
    <View style={{ flex: 1, paddingTop: 32 }}>
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
          <Content>
            <DrawerButton
              key={options.drawerLabel as string}
              title={options.drawerLabel as string}
              onPress={onPress}
              isFocused={isFocused}
            />
          </Content>
        );
      })}
    </View>
  );
}
