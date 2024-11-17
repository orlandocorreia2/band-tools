import { DrawerToggleButton } from "@react-navigation/drawer";

import { Container, Title, ContainerButtonMenu } from "./styles";

export default function Header() {
  return (
    <Container>
      <Title>BAND TOOLS</Title>

      <ContainerButtonMenu>
        <DrawerToggleButton tintColor="#FFF" />
      </ContainerButtonMenu>
    </Container>
  );
}
