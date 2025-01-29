import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import DrawerContent from "../components/drawer-content";
import { MenuProvider } from "../contexts/menu";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <MenuProvider>
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
            key={`drawer-screen-home`}
            name="index"
            options={{
              drawerLabel: "Início",
              drawerIcon: ({ color }) => (
                <Feather name="home" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            key={`drawer-screen-show-schedule`}
            name="schedule"
            options={{
              drawerLabel: "Agenda",
              drawerIcon: ({ color }) => (
                <Feather name="calendar" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            key={`drawer-screen-setlists`}
            name="setlists"
            options={{
              drawerLabel: "SetLists",
              drawerIcon: ({ color }) => (
                <Feather name="music" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            key={`drawer-screen-repertoire`}
            name="repertoire"
            options={{
              drawerLabel: "Repertório",
              drawerIcon: ({ color }) => (
                <Feather name="list" size={20} color={color} />
              ),
            }}
          />
        </Drawer>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}
