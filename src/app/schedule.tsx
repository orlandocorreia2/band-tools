import Header from "../components/header";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import SchedulePage from "../pages/schedule";

export default function Schedule() {
  return (
    <DrawerSceneWrapper>
      <Header title="Agenda" />
      <SchedulePage></SchedulePage>
    </DrawerSceneWrapper>
  );
}
