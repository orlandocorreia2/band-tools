import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import SchedulePage from "../pages/schedule";
import { SafeAreaView } from "../components/styles/styles";

export default function Schedule() {
  return (
    <SafeAreaView>
      <DrawerSceneWrapper>
        <Header title="Agenda" />
        <SchedulePage></SchedulePage>
      </DrawerSceneWrapper>
    </SafeAreaView>
  );
}
