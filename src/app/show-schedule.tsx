import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import Home from "../pages/home";

export default function ShowSchedule() {
  return (
    <DrawerSceneWrapper>
      <Header />
      <Home />
    </DrawerSceneWrapper>
  );
}
