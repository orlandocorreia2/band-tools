import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import RepertoirePage from "../pages/repertoire";
import { SafeAreaView } from "../components/styles/styles";

export default function Repertoire() {
  return (
    <SafeAreaView>
      <DrawerSceneWrapper>
        <Header title="Repertório" />
        <RepertoirePage />
      </DrawerSceneWrapper>
    </SafeAreaView>
  );
}
