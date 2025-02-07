import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import Home from "../pages/home";
import { SafeAreaView } from "../components/styles/styles";

export default function Index() {
  return (
    <SafeAreaView>
      <DrawerSceneWrapper>
        <Header title="Página Inicial" />
        <Home />
      </DrawerSceneWrapper>
    </SafeAreaView>
  );
}
