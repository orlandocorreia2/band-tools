import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import RepertoirePage from "../pages/repertoire";

export default function Repertoire() {
  return (
    <DrawerSceneWrapper>
      <Header title="Repertório" />
      <RepertoirePage />
    </DrawerSceneWrapper>
  );
}
