import Header from "../components/header";
import Container from "../components/container";
import DrawerSceneWrapper from "../components/drawer-scene-wrapper";
import SetlistsPage from "../pages/setists";
import { SafeAreaView } from "../components/styles/styles";

export default function SetLists() {
  return (
    <SafeAreaView>
      <DrawerSceneWrapper>
        <Header title="Setlists" />
        <Container>
          <SetlistsPage />
        </Container>
      </DrawerSceneWrapper>
    </SafeAreaView>
  );
}
