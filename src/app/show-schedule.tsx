import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import Home from "../pages/home";
import { SafeAreaView } from "../components/styles/styles";

export default function ShowSchedule() {
  return (
    <SafeAreaView>
      <DrawerSceneWrapper>
        <Header />
        <Home />
      </DrawerSceneWrapper>
    </SafeAreaView>
  );
}
