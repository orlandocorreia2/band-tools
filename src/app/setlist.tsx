import Header from "../components/header";
import Container from "../components/container";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import SetlistPage from "../pages/setlist";

export default function SetList() {
  return (
    <DrawerSceneWrapper>
      <Header />
      <Container>
        <SetlistPage />
      </Container>
    </DrawerSceneWrapper>
  );
}
