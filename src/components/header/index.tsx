import { DrawerToggleButton } from "@react-navigation/drawer";
import { Text, View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={{ fontSize: 18 }}>Band Tools</Text>

      <View style={{ position: "absolute", right: 8 }}>
        <DrawerToggleButton />
      </View>
    </View>
  );
}
