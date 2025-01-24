import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import Home from "../pages/home";

export default function Index() {
  return (
    <DrawerSceneWrapper>
      <Header title="Página Inicial" />
      <Home />
    </DrawerSceneWrapper>
  );
}
