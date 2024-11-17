import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import DrawerContent from "../components/drawer-content";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "transparent",
          drawerInactiveBackgroundColor: "transparent",
          drawerInactiveTintColor: "#727D98",
          drawerActiveTintColor: "#FFFFFF",
          drawerHideStatusBarOnOpen: true,
          // overlayColor: "transparent",
          drawerStyle: {
            backgroundColor: "#1D1F25",
            paddingTop: 32,
            width: "55%",
          },
          sceneStyle: {
            backgroundColor: "#1D1f25",
            borderRadius: 0,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Início",
            drawerIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="setlist"
          options={{
            drawerLabel: "SetList",
            drawerIcon: ({ color }) => (
              <Feather name="music" size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}