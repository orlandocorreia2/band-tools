import Header from "../components/header";
import Container from "../components/container";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import SetlistsPage from "../pages/setists";

export default function SetLists() {
  return (
    <DrawerSceneWrapper>
      <Header title="Setlists" />
      <Container>
        <SetlistsPage />
      </Container>
    </DrawerSceneWrapper>
  );
}
